import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

import * as actions from '../actions';
import { teamSelector } from '../selectors';
import Unassigned from './Unassigned';
import Team from './Team';

const socket = io();
const styles = {
  teamList: {
    height: 500
  }
}

class Lobby extends React.Component {
  constructor(props) {
    super(props);

    this.accessCode = this.props.params.accessCode;
    this._updatePlayers = this._updatePlayers.bind(this);
  }

  componentDidMount() {
    this._updatePlayers();
    socket.emit('join socket room', this.accessCode);
    socket.on('join game', this._updatePlayers);
    socket.on('update player', () => {
      console.log('received update player emit')
      this._updatePlayers();
    });
  }

  _updatePlayers() {
    console.log('updating players')
    const { getPlayerList, gameId } = this.props;

    getPlayerList(gameId);
  }

  render() {
    const { playerId, teams } = this.props;

    return (
      <GridList cols={3}>
        <Subheader>Lobby for game: {this.accessCode}</Subheader>
        <GridTile style={styles.teamList}>
          <Team
            color="Red"
            spymaster={teams.redSpymaster}
            operatives={teams.redOperatives}
            playerId={playerId}
            socket={socket}
            accessCode={this.accessCode}
          />
        </GridTile>
        <GridTile style={styles.teamList}>
          <Team
            color="Blue"
            spymaster={teams.blueSpymaster}
            operatives={teams.blueOperatives}
            playerId={playerId}
            socket={socket}
            accessCode={this.accessCode}
          />
        </GridTile>
        <GridTile style={styles.teamList}>
          <Unassigned
            playerList={teams.unassigned}
            playerId={playerId}
            socket={socket}
            accessCode={this.accessCode}
          />
        </GridTile>
      </GridList>

    );
  }
}

const mapStateToProps = (state) => ({
  gameId: state.menu.game.id,
  playerId: state.menu.player.id,
  teams: teamSelector(state)
});

const LobbyContainer = connect(mapStateToProps, actions)(Lobby);

export { LobbyContainer as Lobby, Team, Unassigned };
