import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskHomeComponent } from './task-home/task-home.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskHeaderComponent } from './task-header/task-header.component';
import { TaskItemComponent } from './task-item/task-item.component';
import {TaskRoutingModule} from './task-routing.module';
import {SharedModule} from '../shared/shared.module';
import {MatIconModule, MatMenu, MatMenuModule} from '@angular/material';
import { NewTaskComponent } from './new-task/new-task.component';
import { CopyTaskComponent } from './copy-task/copy-task.component';

@NgModule({
  imports: [
    SharedModule,
    TaskRoutingModule
  ],
  declarations: [
    TaskHomeComponent,
    TaskListComponent,
    TaskHeaderComponent,
    TaskItemComponent,
    NewTaskComponent,
    CopyTaskComponent
  ],
  entryComponents: [
    NewTaskComponent,
    CopyTaskComponent
  ]
})
export class TaskModule { }
