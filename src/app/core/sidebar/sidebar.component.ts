import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { getDate } from 'date-fns';
import { Observable } from 'rxjs/Observable';
import * as actions from '../../actions/project.action';
import { Project } from '../../domain';
import * as fromRoot from '../../reducers';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() navClick = new EventEmitter();

  today = 'day';
  projects$: Observable<Project[]>;
  constructor(private store$: Store<fromRoot.State>) {
    this.projects$ = this.store$.select(fromRoot.getProjects);
  }

  ngOnInit() {
    this.today = `day${getDate(new Date())}`;
  }

  onNavClick() {
    this.navClick.emit();
  }

  onPrjClick(prj: Project) {
    this.store$.dispatch(new actions.SelectAction(prj));
    this.navClick.emit();
  }

}
