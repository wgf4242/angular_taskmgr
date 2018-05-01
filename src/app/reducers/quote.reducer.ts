import * as quoteAction from '../actions/quote.action';
export interface State {

};

export const initialState: State = {
  quote: {
    cn: '慧妍',
    en: 'Aliquam erat volutpat.',
    pic: '/assets/img/quotes/1.jpg'
  }
};

export function reducer(state = initialState, action: {type: string, payload: any}): State {
  switch ( action.type) {
    case quoteAction.QUOTE_SUCCESS: {
      return { ...state, quote: action.payload};
      // return Object.assign({}, state, {quote: action.payload})
    }
    case quoteAction.QUOTE_FAILED:
    default: {
      return state;
    }
  }

}
