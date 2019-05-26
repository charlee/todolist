import { applyMiddleware, createStore, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { RootAction, RootState } from 'StoreTypes';
import { Services } from 'ServiceTypes';

import rootReducer from './reducers';
import rootEpic from './epics';
import services from '../services';

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  Services
>({ dependencies: services });

export const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// configure middlewares
const middlewares = [epicMiddleware];
// compose enhancers
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// rehydrate state on app start
const initialState = {};

// create store
const store = createStore(rootReducer, initialState, enhancer);

epicMiddleware.run(rootEpic);

// export store singleton instance
export default store;
