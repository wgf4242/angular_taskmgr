import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewProjectComponent} from '../new-project/new-project.component';
import {InviteComponent} from '../invite/invite.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects = [
    {
      'name': 'itemMame-1',
      'desc': 'this is a ent project',
      'coverImg': 'assets/img/covers/0.jpg'
    },
    {
      'name': 'Auto test',
      'desc': 'this is a ent project',
      'coverImg': 'assets/img/covers/1.jpg'
    }
  ];

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openNewProjectDialog() {
    // const config = {width: '100px', height: '100px', position: {left: '0', top: '0'}};
    // const dialogRef = this.dialog.open(NewProjectComponent, config);
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '新增项目:'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }

  launcherUpdateDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '编辑项目:'}});
  }

  launcheConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目:', content: '您确认删除该项目么'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }
}
