
export const QUOTE = 'Quote';
export const QUOTE_SUCCESS = 'Quote Success';
export const QUOTE_FAILED = 'Failed';

// ng-rx-actions

import {Action} from '@ngrx/store';
import {type} from '../utils/type.util';
import {Quote} from '../domain';

export const ActionTypes = {
  LOAD: type('[Quote] Load'),
  LOAD_SUCCESS: type('[Quote] Load Success'),
  LOAD_FAIL: type('[Quote] Load Fail')
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: null) {}
}

export class LoadSucessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Quote) {}
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: string) {}
}

export type Action
  = LoadAction
  | LoadSucessAction
  | LoadFailAction;
