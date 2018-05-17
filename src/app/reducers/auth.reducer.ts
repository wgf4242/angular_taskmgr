import * as actions from '../actions/auth.action';
import {Auth} from '../domain/auth.model';

export const initialState: Auth = {};

export function reducer(state = initialState, action: actions.Actions): Auth {
  switch ( action.type) {
    case actions.ActionTypes.REGISTER_SUCCESS:
    case actions.ActionTypes.LOGIN_SUCCESS: {
      const auth = <Auth>action.payload;
      return {
        ...auth,
        token: auth.token,
        userId: auth.user.id
      };
    }
    case actions.ActionTypes.REGISTER_FAIL:
    case actions.ActionTypes.LOGIN_FAIL: {
      return initialState;
    }
    default: {
      return state;
    }
  }

}
