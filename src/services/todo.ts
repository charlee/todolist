import { get$ } from './base';
import { Todo } from 'Models';
import { of } from 'rxjs';

// export const listTodos$ = () => get$<Todo[]>('/todos');

// Mock response
export const listTodo$ = () =>
  of([
    { id: 1, text: 'Buy milk', done: false },
    { id: 2, text: 'Register summer camp', done: false },
  ]);
