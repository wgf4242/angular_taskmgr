import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewProjectComponent} from '../new-project/new-project.component';
import {InviteComponent} from '../invite/invite.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {slideToRight} from '../../anims/router.anim';
import {listAnimation} from '../../anims/list.anim';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  animations: [slideToRight, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {

  @HostBinding('@routeAnim') state;

  projects;

  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef, private service$: ProjectService) {
  }

  ngOnInit() {
    this.service$.get('1').subscribe(projects => this.projects = projects);
  }

  openNewProjectDialog() {
    // const config = {width: '100px', height: '100px', position: {left: '0', top: '0'}};
    // const dialogRef = this.dialog.open(NewProjectComponent, config);
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '新增项目:'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = [...this.projects,
        {id: 3, name: '一个新项目', desc: '这是一个新项目', coverImg: 'assets/img/covers/1.jpg'},
        {id: 4, name: '又一个新项目', desc: '这是又一个新项目', coverImg: 'assets/img/covers/0.jpg'},
        ];
      this.cd.markForCheck();
    });
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }

  launcherUpdateDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '编辑项目:'}});
  }

  launcheConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目:', content: '您确认删除该项目么'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = this.projects.filter(p => p.id !== project.id);
      this.cd.markForCheck();
    });
  }
}
