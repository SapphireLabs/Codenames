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
    const { game, player } = this.props;

    return (
      <div>
        { player.host
        ? <RaisedButton
            label="Start Game"
            primary={true}
            disabled={game.status === 'waiting'}
            style={styles.button}
          />
        : player.status === 'waiting'
        ? <RaisedButton
            label="Ready"
            primary={true}
            disabled={!player.team}
            style={styles.button}
          />
        : <RaisedButton
            label="Unready"
            style={styles.button}
          />
        }
        <RaisedButton
          label="Leave Game"
          secondary={true}
          style={styles.button}
        />
      </div>
    );
  }
}
