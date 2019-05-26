import { createSelector } from 'reselect';
import { RootState } from 'StoreTypes';

export const selectTodoEntities = (state: RootState) => state.todos.byId;
export const selectTodoAllIds = (state: RootState) => state.todos.allIds;
export const selectTodoLoading = (state: RootState) => state.todos.loading;

export const selectTodoList = createSelector(
  [selectTodoEntities, selectTodoAllIds],
  (entities, allIds) => allIds.map(id => entities[id]),
);