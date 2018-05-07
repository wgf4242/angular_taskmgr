import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/auth.action';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Auth} from '../../domain/auth.model';
import {getAuthState} from '../../reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  auth$: Observable<Auth>;
  @Output() toggle = new EventEmitter<void>();
  @Output() toggleDarkTheme = new EventEmitter<boolean>();

  constructor(private store$: Store<fromRoot.State>) {
    this.auth$ = this.store$.select(getAuthState);
  }

  ngOnInit() {
  }

  openSidebar() {
    this.toggle.emit();
  }

  onChange(checked: boolean) {
    this.toggleDarkTheme.emit(checked);
  }

  logout() {
    this.store$.dispatch(new actions.LogoutAction(null));
  }
}
