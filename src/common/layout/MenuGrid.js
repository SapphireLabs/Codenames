import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const styles = () => ({
  root: {
    flexGrow: 1,
    height: '100%'
  }
});

const MenuGrid = props => (
  <Grid
    container
    alignItems="center"
    justify="center"
    className={props.classes.root}
  >
    <Grid item xs={6}>
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item xs={6}>
          {props.children}
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

MenuGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default withStyles(styles)(MenuGrid);
