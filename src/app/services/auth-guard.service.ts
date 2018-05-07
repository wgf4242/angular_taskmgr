import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import {getAuthState} from '../reducers';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private store$: Store<fromRoot.State>, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store$
      .select(getAuthState)
      .map(auth => {
        const result = auth.token !== null && auth.token !== undefined;
        if (result) {
            this.router.navigate['/login'];
        }
        return result;
      })
      .defaultIfEmpty(false);
  }
}

