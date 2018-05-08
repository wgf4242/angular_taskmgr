import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import * as actions from '../actions/auth.action';
import {LoginAction, RegisterAction} from '../actions/auth.action';
import {AuthService} from '../services/auth.service';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {User} from '../domain';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.LOGIN),
    map((action: LoginAction) => action.payload),
    mergeMap( ({email, password}) =>
      this.service$.login(email, password).pipe(
        map(auth => (new actions.LoginSuccessAction(auth))),
        catchError((err) => of(new actions.LoginFailAction(JSON.stringify(err))))  ))
  );

  @Effect()
  register$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.REGISTER),
    map((action: RegisterAction) => action.payload),
    mergeMap( (user: User) =>
      this.service$.register(user).pipe(
        map(auth => (new actions.RegisterSuccessAction(auth))),
        catchError((err) => of(new actions.RegisterFailAction(JSON.stringify(err))))  ))
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.LOGOUT),
    tap(() => this.router.navigate['/']));

  @Effect()
  loginAndNavigate$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.LOGIN_SUCCESS),
    tap(() => this.router.navigate['/projects']));

  @Effect()
  registerAndNavigate$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.REGISTER_SUCCESS),
    tap(() => this.router.navigate['/projects']));

  constructor(
    private actions$: Actions,
    private service$: AuthService,
    private router: Router
    ) {}
}
