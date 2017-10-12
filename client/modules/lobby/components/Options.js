import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import Button from 'material-ui/Button';

import * as actions from '../actions';

const styles = {
  button: {
    margin: 12,
  },
};

// If player has team picked, enable ready button
// If player status is waiting - show ready button
// On click ready - update player status to ready, check game valid
// If player status is ready - show unready button
// On click unready - update player status to waiting, update game status to waiting
export default class Options extends React.PureComponent {
  static propTypes = {
    accessCode: PropTypes.string.isRequired,
    game: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
    readyPlayer: PropTypes.func.isRequired,
    socket: PropTypes.object.isRequired,
    startGame: PropTypes.func.isRequired,
    unreadyPlayer: PropTypes.func.isRequired,
  };

  handleClickReady = () => {
    const { player, readyPlayer, socket, accessCode } = this.props;

    readyPlayer(player)
      .then(() => { socket.emit('toggle ready', accessCode) });
  };

  handleClickUnready = () => {
    const { player, unreadyPlayer, socket, accessCode } = this.props;

    unreadyPlayer(player)
      .then(() => { socket.emit('toggle ready', accessCode) });
  };

  handleClickStart = () => {
    const { startGame, game, socket, accessCode } = this.props;

    startGame(game.id)
      .then(() => { socket.emit('start game', accessCode) });
  };

  // Socket emit leave game
  // Redirect to root
  // Designate next player as host
  handleClickLeave = () => {
    browserHistory.push('/');
  };

  render() {
    const { game, player } = this.props;

    // start game enabled for dev
    // disabled={game.status === 'waiting'}
    return (
      <div>
        { player.host
          ? <Button
              raised
              color="primary"
              label="Start Game"
              onClick={this.handleClickStart}
              style={styles.button}
            >
              Start Game
            </Button>
          : null
        }
        { player.status === 'waiting'
          ? <Button
              raised
              color="primary"
              label="Ready"
              disabled={!player.team}
              onClick={this.handleClickReady}
              style={styles.button}
            >
              Ready
            </Button>
          : <Button
              raised
              onClick={this.handleClickUnready}
              style={styles.button}
            >
              Unready
            </Button>
        }
        <Button
          raised
          color="accent"
          onClick={this.handleClickLeave}
          style={styles.button}
        >
          Leave Game
        </Button>
      </div>
    );
  }
}
