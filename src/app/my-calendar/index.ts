import { NgModule } from '@angular/core';
import { CalendarModule } from 'angular-calendar';
import { SharedModule } from '../shared/shared.module';
import { CalendarHomeComponent } from './calendar-home/calendar-home.component';
import { MyCalendarRoutingModule } from './my-calendar-routing.module';


@NgModule({
  imports: [
    SharedModule,
    MyCalendarRoutingModule,
    CalendarModule.forRoot(),
  ],
  declarations: [CalendarHomeComponent]
})
export class MyCalendarModule { }
