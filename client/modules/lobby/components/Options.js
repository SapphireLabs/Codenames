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

// if player has team picked, enable ready button
// if player status is waiting - show ready button
// onclick ready - update player status to ready, check game valid
// if player status is ready - show unready button
// onclick unready = update player status to waiting, update game status to waiting

export default class Options extends React.PureComponent {
  render() {
    return (
      <div>
        <RaisedButton
          label="Ready"
          primary={true}
          style={styles.button}
        />
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
