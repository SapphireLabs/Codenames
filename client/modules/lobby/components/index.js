import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

import * as actions from '../actions';
import Unassigned from './Unassigned';
import Team from './Team';

const socket = io();

class LobbyContainer extends React.Component {
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
      <GridList cols={3}>
        <Subheader>Lobby for game: {this.accessCode}</Subheader>
        <GridTile>
          <Team
            color="Red"
            playerList={this.props.playerList}
          />
        </GridTile>
        <GridTile>
          <Team
            color="Blue"
            playerList={this.props.playerList}
          />
        </GridTile>
        <GridTile>
          <Unassigned playerList={this.props.playerList} />
        </GridTile>
      </GridList>

    );
  }
}

const mapStateToProps = (state) => ({
  gameId: state.menu.game.id,
  playerList: state.lobby.playerList
});

const Lobby = connect(mapStateToProps, actions)(LobbyContainer);

export { Lobby };
