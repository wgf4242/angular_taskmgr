import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import * as actions from '../../actions/project.action';
import { listAnimation } from '../../anims/list.anim';
import { slideToRight } from '../../anims/router.anim';
import * as fromRoot from '../../reducers';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { InviteComponent } from '../invite/invite.component';
import { NewProjectComponent } from '../new-project/new-project.component';
import { Project } from './../../domain/project.model';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  animations: [slideToRight, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent {

  @HostBinding('@routeAnim') state;

  projects$: Observable<Project[]>;
  listAnim$: Observable<number>;

  constructor(
    private dialog: MatDialog,
    private store$: Store<fromRoot.State>
  ) {
    this.store$.dispatch(new actions.LoadAction(null));
    this.projects$ = this.store$.select(fromRoot.getProjects);
    this.listAnim$ = this.projects$.map(p => p.length);
  }

  openNewProjectDialog() {
    // const config = {width: '100px', height: '100px', position: {left: '0', top: '0'}};
    // const dialogRef = this.dialog.open(NewProjectComponent, config);
    const selectedImg = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    console.log(selectedImg);
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {thumbnails: this.getThumbnails(), img: selectedImg}});
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .map(val => ({...val, coverImg: this.buildImgSrc(val.coverImg)}))
      .subscribe(project => {
        this.store$.dispatch(new actions.AddAction(project));
      });
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent, {data: {members: []}});
  }

  launcherUpdateDialog(project: Project) {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {thumbnails: this.getThumbnails(), project: project}});
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .map(val => ({...val, id: project.id, coverImg: this.buildImgSrc(val.coverImg)}))
      .subscribe(project => {
        this.store$.dispatch(new actions.UpdateAction(project));
      });
  }

  launcheConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {thumbnails: this.getThumbnails(), project: project}});
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .subscribe(_ => {
        this.store$.dispatch(new actions.DeleteAction(project));
      });
  }

  private getThumbnails() {
    return _.range(0, 40)
      .map(i => `/assets/img/covers/${i}_tn.jpg`);
  }

  private buildImgSrc(img: string): string {
    console.log(img);
    return img.indexOf('_') > -1 ? img.split('_')[0] + '.jpg' : img;
  }

  selectProject(project: Project) {
    this.store$.dispatch(new actions.SelectAction(project));
  }
}
