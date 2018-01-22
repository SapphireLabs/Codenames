import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const styles = () => ({
  root: {
    flexGrow: 1,
    height: '100%'
  },
  grow: {
    flex: 1
  },
  content: {
    flex: '1 0 60%'
  }
});

const GameGrid = props => (
  <Grid
    container
    className={props.classes.root}
    direction="column"
    justify="center"
  >
    <Grid item className={props.classes.grow}>
      <Grid container justify="center">
        <Grid item>HEADER</Grid>
      </Grid>
    </Grid>
    <Grid item className={props.classes.content}>
      <Grid container justify="center" className={props.classes.root}>
        <Grid item xs={9}>
          BOARD
          {props.boardComponent}
        </Grid>
        <Grid item xs={3}>
          CHAT
          {props.chatComponent}
        </Grid>
      </Grid>
    </Grid>
    <Grid item className={props.classes.grow}>
      <Grid container justify="center">
        OPTIONS
        <Grid item>{props.optionsComponent}</Grid>
      </Grid>
    </Grid>
  </Grid>
);

GameGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  boardComponent: PropTypes.node.isRequired,
  chatComponent: PropTypes.node,
  optionsComponent: PropTypes.node
};

export default withStyles(styles)(GameGrid);
