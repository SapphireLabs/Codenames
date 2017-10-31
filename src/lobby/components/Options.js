import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';

import socket, { socketEvents } from '../../common/socket';

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
export class Options extends React.PureComponent {
  static propTypes = {
    accessCode: PropTypes.string.isRequired,
    game: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
    readyPlayer: PropTypes.func.isRequired,
    startGame: PropTypes.func.isRequired,
    unreadyPlayer: PropTypes.func.isRequired,
  };

  handleClickReady = () => {
    const { player, readyPlayer, accessCode } = this.props;

    readyPlayer(player)
      .then(() => { socket.emit(socketEvents.TOGGLE_READY, accessCode) });
  };

  handleClickUnready = () => {
    const { player, unreadyPlayer, accessCode } = this.props;

    unreadyPlayer(player)
      .then(() => { socket.emit(socketEvents.TOGGLE_READY, accessCode) });
  };

  handleClickStart = () => {
    const { startGame, game, accessCode } = this.props;

    startGame(game.id)
      .then(() => { socket.emit(socketEvents.START_GAME, accessCode) });
  };

  // Socket emit leave game
  // Redirect to root
  // Designate next player as host
  handleClickLeave = () => {
    this.props.dispatch(push('/'));
  };

  render() {
    const { player } = this.props;

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

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(null, mapDispatchToProps)(Options);
