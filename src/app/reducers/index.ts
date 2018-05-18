import {NgModule} from '@angular/core';
import {ActionReducer, ActionReducerMap, MetaReducer, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {storeFreeze} from 'ngrx-store-freeze';
import {createSelector} from 'reselect';
import {environment} from '../../environments/environment';
import {Auth} from '../domain/auth.model';
import {AppEffectsModule} from '../effects';
import * as fromAuth from './auth.reducer';
import * as fromProjects from './project.reducer';
import * as fromQuote from './quote.reducer';
import * as fromTaskList from './task-list.reducer';
import * as fromTask from './task.reducer';
import * as fromUser from './user.reducer';

export interface State {
  quote: fromQuote.State;
  auth: Auth;
  projects: fromProjects.State;
  taskLists: fromTaskList.State;
  tasks: fromTask.State;
  users: fromUser.State;
}

const initialState: State = {
  quote: fromQuote.initialState,
  auth: fromAuth.initialState,
  projects: fromProjects.initialState,
  taskLists: fromTaskList.initialState,
  tasks: fromTask.initialState,
  users: fromUser.initialState,
};

const reducers: ActionReducerMap<State> = {
  quote: fromQuote.reducer,
  auth: fromAuth.reducer,
  projects: fromProjects.reducer,
  taskLists: fromTaskList.reducer,
  tasks: fromTask.reducer,
  users: fromUser.reducer,
  // router: fromRouter.routerReducer
};

// const productionReducers: ActionReducer<State> = combineReducers(reducers);
// const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers) as ActionReducer<State>;
// export function reducer(state = initialState, action: any): State {
  // return environment.production ? productionReducers(state, action) : developmentReducers(state, action);
// }

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger , storeFreeze]
  : [];

export const getQuoteState = (state: State) => state.quote;
export const getAuthState = (state: State) => state.auth;
export const getProjectState = (state: State) => state.projects;
export const getTaskListState = (state: State) => state.taskLists;
export const getTaskState = (state: State) => state.tasks;
export const getUserState = (state: State) => state.users;

export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);
export const getProjects = createSelector(getProjectState, fromProjects.getAll);
export const getTaskLists = createSelector(getTaskListState, fromTaskList.getSelected);
export const getTasks = createSelector(getTaskState, fromTask.getTasks);
export const getUsers = createSelector(getUserState, fromUser.getUsers);

export const getUserEntities = createSelector(getUserState, fromUser.getEntities);
export const getTasksWithOwners = createSelector(getTasks, getUserEntities, (tasks , userEntities) => {
  return tasks.map(task => {
    return {
      ...task,
    owner: userEntities[task.ownerId],
    participants: task.participantIds.map(id => userEntities[id])
    };
  });
});

export const getTasksByLists = createSelector(getTaskLists, getTasksWithOwners, (lists, tasks) => {
  return lists.map(list => {
    return {
      ...list,
      tasks: tasks.filter(task => task.taskListId === list.id)
    };
  });
});

export const getProjectUsers = (projectId: string) => createSelector(getProjectState, getUserEntities, (state, entities) => {
  return state.entities[projectId].members.map(id => entities[id]);
});

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    // StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    AppEffectsModule,
  ],
})
export class AppStoreModule {}
