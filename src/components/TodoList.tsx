import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Theme, makeStyles, List } from '@material-ui/core';
import { RootState } from 'StoreTypes';
import { selectTodoList } from '../store/selectors/todo';
import { Dispatch } from 'redux';
import { listTodo } from '../store/actions/todo';
import TodoItem from './TodoItem';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: '40px auto 0 auto',
    width: 480,
    backgroundColor: theme.palette.background.paper,
  },
}));

const mapStateToProps = (state: RootState) => ({
  todos: selectTodoList(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  listTodo: () => dispatch(listTodo.request()),
});

export interface IProps
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}

const TodoList = (props: IProps) => {
  const classes = useStyles();
  const { todos, listTodo } = props;

  useEffect(() => {
    listTodo();
  }, []);

  return (
    <List className={classes.root}>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </List>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
