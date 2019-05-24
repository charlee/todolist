import { combineEpics } from 'redux-observable';
import * as todoEpic from './todo';

export default combineEpics(
  ...Object.values(todoEpic),
);
