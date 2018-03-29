import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {LoginModule} from './login/login.module';
import {AppRoutingModule} from './app-routing.module';
import {ProjectModule} from './project/project.module';
import {MatDialog, MatDialogModule, MatSidenavModule} from '@angular/material';
import {TaskModule} from './task/task.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatDialogModule,
    LoginModule,
    ProjectModule,
    TaskModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {
}
