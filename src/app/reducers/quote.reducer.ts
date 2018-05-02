import * as actions from '../actions/quote.action';
import {Quote} from '../domain';

export interface State {
  quote: Quote;
}

export const initialState: State = {
  quote: {
    cn: '慧妍',
    en: 'Aliquam erat volutpat.',
    pic: '/assets/img/quotes/1.jpg'
  }
};

export function reducer(state = initialState, action: actions.Action): State {
  switch (action.type) {
    case actions.ActionTypes.LOAD_SUCCESS: {
      return { ...state, quote: <Quote>action.payload};
      // return Object.assign({}, state, {quote: action.payload})
    }
    case actions.ActionTypes.LOAD_FAIL:
    default: {
      return state;
    }
  }
}

export const getQuote = (state: State) => state.quote;
