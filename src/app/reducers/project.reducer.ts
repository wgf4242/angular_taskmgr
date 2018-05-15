import { Project } from './../domain/project.model';
import * as actions from '../actions/project.action';

export interface State {
     ids: string[];
     entities: {[id: string]: Project};
     selectedId: string | null;
};

const initialState: State = {
    ids: [],
    entities: {},
    selectedId: null,
};

const addProject = (state, action) => {
  const project = action.payload;
  if (state.entities[project.id]) {
    return state;
  }
  const ids = [...state.ids, project.id];
  const entities = {...state.entities, [project.id]: project};
  return {...state, ids: ids, entities: entities};
};

const updateProject = (state, action) => {
  const project = action.payload;
  const entities = {...state.entities, [project.id]: project};
  return {...state, entities: entities};
}

export function reducer(state = initialState, action: actions.Actions ): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS: {
      return addProject(state, action);
    }

    case actions.ActionTypes.DELETE_SUCCESS: {
      return delProject(state, action);
    }
    case actions.ActionTypes.UPDATE_SUCCESS: {
      return updateProject(state, action);
    }
    case actions.ActionTypes.LOAD_SUCCESS: {
      return loadProject(state, action);
    }
    case actions.ActionTypes.SELECT_PROJECT: {
      return {...state, selectedId: action.payload.id};
    }
    default: {
      return state;
    }
  }
}
