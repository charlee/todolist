import { createAsyncAction, createStandardAction } from 'typesafe-actions';
import { Todo } from 'Models';

// Synchronize action
export const setNote = createStandardAction('NOTE:SET_NOTE')<string>();

// Asynchronize actions
export const listTodo = createAsyncAction(
  'TODO:LIST:REQUEST',
  'TODO:LIST:SUCCESS',
  'TODO:LIST:FAILURE',
)<void, Todo[], Error>();
