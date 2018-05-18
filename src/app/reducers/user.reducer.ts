import * as _ from 'lodash';
import { createSelector } from 'reselect';
import * as actions from '../actions/user.action';
import { User } from '../domain';

export interface State {
     ids: string[];
     entities: {[id: string]: User};
}

export const initialState: State = {
    ids: [],
    entities: {},
};

const addUser = (state, action) => {
  const user = action.payload;
  const newIds = [...state.ids, user.id];
  const newEntities = { ...state.entities, [user.id]: user };
  return state.entities[user.id] ?
    { ...state, entities: newEntities } : { ...state, ids: newIds, entities: newEntities};
};

const updateUser = (state, action) => {
  const users = <User[]>action.payload;
  const incomingEntities = _.chain(users)
    .keyBy('id')
    .mapValues(o => o)
    .value();
  const newEntities = {...state.entities, ...incomingEntities};
  return {...state, entities: newEntities};
};

const delUser = (state, action) => {
  const user = action.payload;
  const newEntities = { ...state.entities, [user.id]: user };
  return state.entities[user.id] ?
    {...state, entities: newEntities} : state;
};

const loadUsers = (state, action) => {
  const users = action.payload;
  const incomingIds = users.map(p => p.id);
  const newIds = _.difference(incomingIds, state.ids);
  const incomingEntities = _.chain(users)
    .keyBy('id')
    .mapValues(o => o)
    .value();
  const newEntities = newIds.reduce((entities, id: string) => ({ ...entities, [id]: incomingEntities[id] }), {});
  return {
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities},
  };
};

export function reducer(state = initialState, action: actions.Actions ): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS: {
      return addUser(state, action);
    }
    case actions.ActionTypes.DELETE_SUCCESS: {
      return delUser(state, action);
    }
    case actions.ActionTypes.UPDATE_SUCCESS: {
      return updateUser(state, action);
    }
    case actions.ActionTypes.SEARCH_SUCCESS:
    case actions.ActionTypes.LOAD_SUCCESS: {
      return loadUsers(state, action);
    }
    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;

export const getUsers = createSelector(getIds, getEntities, (ids, entities) => {
  return ids.map(id => entities[id]);
});

