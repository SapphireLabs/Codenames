import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import * as actions from '../actions';
import Unassigned from './Unassigned';

const socket = io();

class LobbyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.accessCode = this.props.params.accessCode;
    this._updatePlayers = this._updatePlayers.bind(this);
  }

  componentDidMount() {
    this._updatePlayers();
    socket.emit('join socket room', this.accessCode);
    socket.on('join game', this._updatePlayers);
  }

  _updatePlayers() {
    const { getPlayerList, gameId } = this.props;

    getPlayerList(gameId);
  }

  render() {
    return (
      <section>
        <p>Lobby for game: {this.accessCode}</p>
        <Unassigned playerList={this.props.playerList} />
      </section>

    );
  }
}

const mapStateToProps = (state) => ({
  gameId: state.menu.game.id,
  playerList: state.lobby.playerList
});

const Lobby = connect(mapStateToProps, actions)(LobbyComponent);

export { Lobby };
