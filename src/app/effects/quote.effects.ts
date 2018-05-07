import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import * as actions from '../actions/quote.action';
import {QuoteService} from '../services/quote.service';

@Injectable()
export class QuoteEffects {

  @Effect()
  quote$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD)
    // .map(toPayload) // this action default is null
    .switchMap(_ => this.service$.getQuote()
        .map(data => new actions.LoadSuccessAction(data))
        .catch(err =>  Observable.of(new actions.LoadFailAction(JSON.stringify(err)))
      )
  );

  constructor(private actions$: Actions, private service$: QuoteService) {
  }
}
