import React from 'react';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {},
  });

export interface IProps extends WithStyles<typeof styles> {}

const Todo = (props: IProps) => {
  const { classes } = props;
  return <div className={classes.root} />;
};

export default withStyles(styles)(Todo);
