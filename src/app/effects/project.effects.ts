import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as actions from '../actions/project.action';
import * as listActions from '../actions/task-list.action';
import * as fromRoot from '../reducers';
import { ProjectService } from '../services/project.service';

@Injectable()
export class ProjectEffects {

  @Effect()
  loadProjects$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.LOAD),
    map((action: actions.LoadAction) => action.payload),
    withLatestFrom(this.store$.select(fromRoot.getAuthState)),
    switchMap(([_, auth]) => this.service$.get(auth.userId).pipe(
        map(projects => new actions.LoadSuccessAction(projects)),
        catchError((err) => of(new actions.LoadFailAction(JSON.stringify(err))))))
  );

  @Effect()
  addProjects$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.ADD),
    map((action: actions.AddAction) => action.payload),
    withLatestFrom(this.store$.select(fromRoot.getAuthState)),
    switchMap(([project, auth]) => {
      const added = {...project, members: [`${auth.userId}`]};
      return this.service$.add(added).pipe(
        map(prj => new actions.AddSuccessAction(prj)),
        catchError((err) => of(new actions.AddFailAction(JSON.stringify(err))))
      );
    })
  );

  @Effect()
  updateProjects$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.UPDATE),
    map((action: actions.UpdateAction) => action.payload),
    switchMap((project) => this.service$.update(project).pipe(
        map(prj => new actions.UpdateSuccessAction(prj)),
        catchError((err) => of(new actions.UpdateFailAction(JSON.stringify(err))))
    ))
  );

  @Effect()
  delProjects$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.DELETE),
    map((action: actions.DeleteAction) => action.payload),
    switchMap((project) => this.service$.del(project).pipe(
        map(prj => new actions.DeleteSuccessAction(prj)),
        catchError((err) => of(new actions.DeleteFailAction(JSON.stringify(err))))
    ))
  );

  @Effect({ dispatch: false })
  selectProjects$ = this.actions$.pipe(
    ofType(actions.ActionTypes.SELECT_PROJECT),
    map((action: actions.SelectAction) => action.payload),
    tap((project) => this.router.navigate([`/tasklists/${project.id}`]))
  );

  @Effect({ dispatch: false })
  loadTaskLists$ = this.actions$.pipe(
    ofType(actions.ActionTypes.SELECT_PROJECT),
    map((action: actions.SelectAction) => action.payload),
    map(project => new listActions.LoadAction(project.id))
  );

  @Effect()
  invite$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.INVITE),
    map((action: actions.InviteAction) => action.payload),
    switchMap(({projectId, members}) => this.service$.invite(projectId, members).pipe(
        map(project => (new actions.InviteSuccessAction(project))),
        catchError((err) => of(new actions.InviteFailAction(JSON.stringify(err))))
    ))
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private service$: ProjectService,
    private router: Router
  ) { }
}
