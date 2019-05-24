import { of } from 'rxjs';
import { filter, mergeMap, map, catchError } from 'rxjs/operators';
import { isOfType, getType } from 'typesafe-actions';
import { listTodo } from '../actions/todo';
import { RootEpic } from 'StoreTypes';

export const ListTodoEpic: RootEpic = (actions$, state$, { todos }) =>
  actions$.pipe(
    filter(isOfType(getType(listTodo.request))),
    mergeMap(action => todos.listTodos$().pipe(map(listTodo.success))),
    catchError(err => of(listTodo.failure(err))),
  );
