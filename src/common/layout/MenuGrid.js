import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
});

class MenuGrid extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children, classes } = this.props;

    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.root}
      >
        <Grid item xs={6}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={6}>
              {children}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(MenuGrid);
