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
    flexGrow: 1
  }
});

const LobbyGrid = props => (
  <Grid
    container
    className={props.classes.root}
    alignItems="center"
    justify="center"
  >
    <Grid item xs={12}>
      <Grid container alignItems="center" justify="center" spacing={16}>
        <Grid item>{props.headerComponent}</Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container alignItems="center" justify="center" spacing={16}>
        <Grid item xs={4}>
          {props.redComponent}
        </Grid>
        <Grid item xs={3}>
          {props.unassignedComponent}
        </Grid>
        <Grid item xs={4}>
          {props.blueComponent}
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container alignItems="center" justify="center" spacing={16}>
        <Grid item>{props.optionsComponent}</Grid>
      </Grid>
    </Grid>
  </Grid>
);

LobbyGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  blueComponent: PropTypes.node.isRequired,
  headerComponent: PropTypes.node.isRequired,
  optionsComponent: PropTypes.node.isRequired,
  redComponent: PropTypes.node.isRequired,
  unassignedComponent: PropTypes.node.isRequired
};

export default withStyles(styles)(LobbyGrid);
