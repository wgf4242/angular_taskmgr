import {NgModule} from '@angular/core';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {ActionReducer, combineReducers, compose, StoreModule} from '@ngrx/store';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';
import * as fromQuote from './quote.reducer';
import {storeFreeze} from 'ngrx-store-freeze';
import {environment} from '../../environments/environment';
import {createSelector} from 'reselect';
import {Action} from '../actions/quote.action';

export interface State {
  quote: fromQuote.State;
};

const initialState: State = {
  quote: fromQuote.initialState
};

const reducers = {
  quote: fromQuote.reducer,
  router: routerReducer,
};

const productionReducers: ActionReducer<State> = combineReducers(reducers);
const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers) as ActionReducer<State, Action>;

export function reducer(state = initialState, action: any): State {
  return environment.production ? productionReducers(state, action) : developmentReducers(state, action);
}

export const getQuoteState = (state: State) => state.quote;

export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router', // name of reducer key
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
})
export class AppStoreModule {}
