import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { TaskService } from '../../services/task.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { startOfDay, endOfDay } from 'date-fns';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#d1e8ff'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#fdf18a'
  }
};

const getColor = (priority: number) => {
  switch (priority) {
    case 1:
      return colors.red;
    case 2:
      return colors.blue;
    default:
      return colors.yellow;
  }
};

@Component({
  selector: 'app-calendar-home',
  template: `
    <mat-card>
      <div class="toolbar">
        <button mat-icon-button mwlCalendarPreviousView>
          <mat-icon class="md-48">chevron_left</mat-icon>
        </button>
        <button mat-icon-button mwlCalendarToday>
          {{viewDate | date: 'yyyy-MM-dd'}}
        </button>
        <button mat-icon-button mwlCalendarNextView>
          <mat-icon class="md-48">chevron_right</mat-icon>
        </button>
      </div>
      <ng-container *ngIf="(events$ | async) as calEvents">
      <div [ngSwitch]="view$ | async">
      <mwl-calendar-week-view *ngSwitchCase="'week'"
                              [viewDate]="viewDate"
                              [locale]="'zh'"
                              [events]="calEvents"
                              (eventClicked)="handleEvent($event.event)">
      </mwl-calendar-week-view>
      <mwl-calendar-day-view *ngSwitchCase="'day'"
                             [viewDate]="viewDate"
                             [locale]="'zh'"
                             [events]="calEvents"
                             (eventClicked)="handleEvent($event.event)">
      </mwl-calendar-day-view>
      <mwl-calendar-month-view *ngSwitchDefault></mwl-calendar-month-view>
    </div>
      </ng-container>
    </mat-card>

  `,
  styles: [`
    .toolbar {
      display: flex;
      flex-direction: row;
    }
    :host {
      width: 100%;
    }
  `]
})
export class CalendarHomeComponent implements OnInit {

  viewDate: Date;
  view$: Observable<string>;
  events$: Observable<CalendarEvent[]>;
  constructor(
    private route: ActivatedRoute,
    private service$: TaskService,
    private store$: Store<fromRoot.State>
  ) {
    this.viewDate = new Date();
    this.view$ = this.route.paramMap.map(p => p.get('view'));
    this.events$ = this.store$.select(fromRoot.getAuthState).map(auth => auth.user.id)
      .switchMap(userId => this.service$.getUserTasks(userId))
      .map(tasks => tasks.map(task => ({
        start: startOfDay(task.createDate),
        end: endOfDay(task.dueDate),
        title: task.desc,
        color: getColor(task.priority)
      })));
  }

  ngOnInit() {
  }

}
