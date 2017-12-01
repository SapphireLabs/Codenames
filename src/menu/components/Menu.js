import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Snackbar from 'material-ui/Snackbar';

import MenuGrid from '../../common/layout/MenuGrid';
import * as menuActions from '../actions';
import Start from './Start';
import Create from './Create';
import Join from './Join';

const styles = {
  header: {
    textAlign: 'center'
  }
};

export class Menu extends React.Component {
  static propTypes = {
    error: PropTypes.object,
    menuActions: PropTypes.object.isRequired
  };

  handleCloseSnackbar = () => {
    this.props.menuActions.setError(null);
  };

  render() {
    const { error } = this.props;

    return (
      <MenuGrid>
        <div>
          <h1 style={styles.header}>Codenames</h1>
          <Route exact path="/" component={Start} />
          <Route path="/create" component={Create} />
          <Route path="/join" component={Join} />
          <Snackbar
            onRequestClose={this.handleCloseSnackbar}
            open={!!error}
            message={<span>{error && error.response.error}</span>}
          />
        </div>
      </MenuGrid>
    );
  }
}

const mapStateToProps = ({ menu }) => ({
  error: menu.error
});

const mapDispatchToProps = dispatch => ({
  menuActions: bindActionCreators(menuActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
