import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';

import socket from '../../common/socket';
import * as lobbyActions from '../actions';
import { teamSelector } from '../selectors';
import Header from './Header';
import Team from './Team';
import Unassigned from './Unassigned';
import Options from './Options';

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  }
};

export class Lobby extends React.Component {
  constructor(props) {
    super(props);

    this.accessCode = this.props.match.params.accessCode;
    this._refreshPlayerList = this._refreshPlayerList.bind(this);
    this._refreshGame = this._refreshGame.bind(this);
  }

  componentDidMount() {
    this._refreshGame();
    this._refreshPlayerList();
    socket.emit('join socket room', this.accessCode);
    socket.on('join game', this._refreshPlayerList);
    socket.on('update player', this._refreshPlayerList);
    socket.on('toggle ready', () => {
      this._refreshPlayerList();
      this._refreshGame();
    });
    socket.on('start game', () => {
      this.props.dispatch(push(`/${this.accessCode}/game`));
    });
  }

  _refreshPlayerList() {
    const { game } = this.props;

    if (game) {
      this.props.lobbyActions.getPlayerList(game.id);
    } else {
      this.props.lobbyActions.getPlayerList(localStorage.getItem('gameId'));
    }
  }

  _refreshGame() {
    this.props.lobbyActions.getGame(this.accessCode);
  }

  render() {
    const {
      game,
      lobbyActions,
      player,
      teams,
    } = this.props;

    return (
      <section style={styles.container}>
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
              pickRole={lobbyActions.pickRole}
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
              pickRole={lobbyActions.pickRole}
            />
          </div>
          <div className="col-xs-3">
            <Unassigned
              playerList={teams.unassigned}
              player={player}
              socket={socket}
              accessCode={this.accessCode}
              pickRole={lobbyActions.pickRole}
            />
          </div>
        </div>
        <div className="row">
          <Options
            game={game}
            player={player}
            socket={socket}
            accessCode={this.accessCode}
            readyPlayer={lobbyActions.readyPlayer}
            unreadyPlayer={lobbyActions.unreadyPlayer}
            startGame={lobbyActions.startGame}
          />
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  game: state.menu.game,
  player: state.menu.player,
  teams: teamSelector(state)
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  lobbyActions: bindActionCreators(lobbyActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
