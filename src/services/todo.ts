import { get$ } from './base';
import { Todo } from 'Models';

export const listTodos$ = () => get$<Todo[]>('/todos');
