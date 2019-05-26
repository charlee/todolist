import React from 'react';
import {
  Theme,
  makeStyles,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
} from '@material-ui/core';
import { Todo } from 'Models';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

export interface IProps {
  todo: Todo;
}

const TodoItem = (props: IProps) => {
  const classes = useStyles();
  const { todo } = props;
  return (
    <ListItem className={classes.root}>
      <ListItemIcon>
        <Checkbox />
      </ListItemIcon>
      <ListItemText>{todo.text}</ListItemText>
    </ListItem>
  );
};

export default TodoItem;
