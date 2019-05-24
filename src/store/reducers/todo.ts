import _ from 'lodash';
import { getType } from "typesafe-actions";
import { combineReducers } from 'redux';
import { Todo } from "Models";
import { listTodo } from "../actions/todo";

export type TodoState = Readonly<{
  byId: Readonly<{ [key: number]: Todo }>;
  allIds: number[];
  loading: boolean;
}>;

const initialState: TodoState = {
  byId: {},
  allIds: [],
  loading: false,
};

const byId = (state: TodoState['byId'] = initialState.byId, action: RootAction) => {
  switch (action.type) {
    case getType(listTodo.success):
      return _.keyBy(action.payload, 'id');
    default:
      return state;
  }
};

const allIds = (state: TodoState['allIds'] = initialState.allIds, action: RootAction) => {
  switch (action.type) {
    case getType(listTodo.success):
      return _.map(action.payload, 'id');
    default:
      return state;
  }
};

const loading = (state: TodoState['loading'] = initialState.loading, action: RootAction) => {
  switch (action.type) {
    case getType(listTodo.request):
      return true;
    case getType(listTodo.success):
    case getType(listTodo.failure):
      return false;
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds, loading });