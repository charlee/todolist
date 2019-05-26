import React from 'react';
import './App.css';
import TodoList from './TodoList';
import { Theme, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 960,
    margin: '100px auto 0 auto',
    textAlign: 'center',
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h3">Todo List</Typography>
      <TodoList />
    </div>
  );
};

export default App;
