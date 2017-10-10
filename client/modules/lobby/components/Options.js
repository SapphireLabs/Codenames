import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import Button from 'material-ui/Button';

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
  constructor(props) {
    super(props);

    this._handleClickReady = this._handleClickReady.bind(this);
    this._handleClickUnready = this._handleClickUnready.bind(this);
    this._handleClickStart = this._handleClickStart.bind(this);
  }

  _handleClickReady() {
    const { player, readyPlayer, socket, accessCode } = this.props;

    readyPlayer(player)
      .then(() => { socket.emit('toggle ready', accessCode) });
  }

  _handleClickUnready() {
    const { player, unreadyPlayer, socket, accessCode } = this.props;

    unreadyPlayer(player)
      .then(() => { socket.emit('toggle ready', accessCode) });
  }

  _handleClickStart() {
    const { startGame, game, socket, accessCode } = this.props;

    startGame(game.id)
      .then(() => { socket.emit('start game', accessCode) });
  }

  // socket emit leave game
  // redirect to root
  // designate next player as host
  _handleClickLeave() {
    browserHistory.push('/');
  }

  render() {
    const { game, player } = this.props;

    // start game enabled for dev
    // disabled={game.status === 'waiting'}
    return (
      <div>
        { player.host
          ? <Button
              raised
              label="Start Game"
              primary={true}
              onClick={this._handleClickStart}
              style={styles.button}
            />
          : null
        }
        { player.status === 'waiting'
          ? <Button
              raised
              label="Ready"
              primary={true}
              disabled={!player.team}
              onClick={this._handleClickReady}
              style={styles.button}
            />
          : <Button
              raised
              label="Unready"
              onClick={this._handleClickUnready}
              style={styles.button}
            />
        }
        <Button
          raised
          label="Leave Game"
          secondary={true}
          onClick={this._handleClickLeave}
          style={styles.button}
        />
      </div>
    );
  }
}
