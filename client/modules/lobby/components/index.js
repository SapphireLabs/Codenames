import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import * as actions from '../actions';
import { teamSelector } from '../selectors';
import Header from './Header';
import Team from './Team';
import Unassigned from './Unassigned';
import Options from './Options';

const socket = io();
const styles = {
  teamList: {
    height: 500
  }
};

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
      <section>
        <Header
          accessCode={this.accessCode}
        />
        <div className="row around-xs">
          <div className="col-xs-3">
            <Team
              color="Red"
              spymaster={teams.redSpymaster}
              operatives={teams.redOperatives}
              playerId={playerId}
              socket={socket}
              accessCode={this.accessCode}
            />
          </div>
          <div className="col-xs-3">
            <Team
              color="Blue"
              spymaster={teams.blueSpymaster}
              operatives={teams.blueOperatives}
              playerId={playerId}
              socket={socket}
              accessCode={this.accessCode}
            />
          </div>
          <div className="col-xs-3">
            <Unassigned
              playerList={teams.unassigned}
              playerId={playerId}
              socket={socket}
              accessCode={this.accessCode}
            />
          </div>
        </div>
        <div className="row">
          <Options />
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  gameId: state.menu.game.id,
  playerId: state.menu.player.id,
  teams: teamSelector(state)
});

const LobbyContainer = connect(mapStateToProps, actions)(Lobby);

export { LobbyContainer as Lobby, Header, Team, Unassigned, Options };
