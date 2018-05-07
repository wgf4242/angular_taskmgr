import {NgModule} from '@angular/core';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {Action, ActionReducer, combineReducers, compose, StoreModule} from '@ngrx/store';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';
import * as fromQuote from './quote.reducer';
import * as fromAuth from './auth.reducer';
import {storeFreeze} from 'ngrx-store-freeze';
import {environment} from '../../environments/environment';
import {createSelector} from 'reselect';
import {Auth} from '../domain/auth.model';

export interface State {
  quote: fromQuote.State;
  auth: Auth;
};

const initialState: State = {
  quote: fromQuote.initialState,
  auth: fromAuth.initialState
};

const reducers = {
  quote: fromQuote.reducer,
  auth: fromAuth.reducer,
  router: routerReducer,
};

const productionReducers: ActionReducer<State> = combineReducers(reducers);
const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers) as ActionReducer<State, Action>;

export function reducer(state = initialState, action: any): State {
  return environment.production ? productionReducers(state, action) : developmentReducers(state, action);
}

export const getQuoteState = (state: State) => state.quote;
export const getAuthState = (state: State) => state.auth;

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
