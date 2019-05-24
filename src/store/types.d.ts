declare module 'StoreTypes' {
  import { StateType, ActionType } from 'typesafe-actions';
  import { Services } from 'ServiceTypes';
  import { Epic } from 'redux-observable';

  export type Store = StateType<typeof import('./index').default>;
  export type RootAction = ActionType<typeof import('./actions').default>;
  export type RootState = StateType<ReturnType<typeof import('./reducers').default>>;
  export type RootEpic = Epic<RootAction, RootAction, RootState, Services>;
}
