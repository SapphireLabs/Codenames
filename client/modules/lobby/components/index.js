import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import io from 'socket.io-client';

import * as actions from '../actions';
import { teamSelector } from '../selectors';
import Header from './Header';
import Team from './Team';
import Unassigned from './Unassigned';
import Options from './Options';


const socket = io();

class Lobby extends React.Component {
  constructor(props) {
    super(props);

    this.accessCode = this.props.params.accessCode;
    this._refreshPlayerList = this._refreshPlayerList.bind(this);
    this._refreshGame = this._refreshGame.bind(this);
  }

  componentDidMount() {
    this._refreshPlayerList();
    socket.emit('join socket room', this.accessCode);
    socket.on('join game', this._refreshPlayerList);
    socket.on('update player', this._refreshPlayerList);
    socket.on('toggle ready', () => {
      this._refreshPlayerList();
      this._refreshGame();
    });
    socket.on('start game', () => {
      browserHistory.push(`/${this.accessCode}/game`);
    });
  }

  _refreshPlayerList() {
    this.props.getPlayerList(this.props.game.id);
  }

  _refreshGame() {
    this.props.getGame(this.accessCode);
  }

  render() {
    const {
      game,
      player,
      teams,
      pickRole,
      readyPlayer,
      unreadyPlayer,
      startGame
    } = this.props;

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
              player={player}
              socket={socket}
              accessCode={this.accessCode}
              pickRole={pickRole}
            />
          </div>
          <div className="col-xs-3">
            <Team
              color="Blue"
              spymaster={teams.blueSpymaster}
              operatives={teams.blueOperatives}
              player={player}
              socket={socket}
              accessCode={this.accessCode}
              pickRole={pickRole}
            />
          </div>
          <div className="col-xs-3">
            <Unassigned
              playerList={teams.unassigned}
              player={player}
              socket={socket}
              accessCode={this.accessCode}
              pickRole={pickRole}
            />
          </div>
        </div>
        <div className="row">
          <Options
            game={game}
            player={player}
            socket={socket}
            accessCode={this.accessCode}
            readyPlayer={readyPlayer}
            unreadyPlayer={unreadyPlayer}
            startGame={startGame}
          />
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  game: state.menu.game,
  player: state.menu.player,
  teams: teamSelector(state)
});

const LobbyContainer = connect(mapStateToProps, actions)(Lobby);

export { LobbyContainer as Lobby, Header, Team, Unassigned, Options };
