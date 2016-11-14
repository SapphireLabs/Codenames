import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import RaisedButton from 'material-ui/RaisedButton';

import * as actions from '../actions';

const styles = {
  button: {
    margin: 12
  }
};

export default class Options extends React.PureComponent {
  render() {
    return (
      <div>
        <RaisedButton
          label="Start Game"
          primary={true}
          style={styles.button}
        />
        <RaisedButton
          label="Leave Game"
          secondary={true}
          style={styles.button}
        />
      </div>
    );
  }
}
