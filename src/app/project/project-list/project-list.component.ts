import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewProjectComponent} from '../new-project/new-project.component';

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
    const config = {width: '100px', height: '100px', position: {left: '0', top: '0'}};
    const data = {data: {dark: true}};
    // this.dialog.open(NewProjectComponent);
    // this.dialog.open(NewProjectComponent, config);
    const dialogRef = this.dialog.open(NewProjectComponent, data);
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }
}
