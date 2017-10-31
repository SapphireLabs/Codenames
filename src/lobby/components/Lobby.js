import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

import socket, { socketEvents } from '../../common/socket';
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
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    game: PropTypes.object.isRequired,
    lobbyActions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
    teams: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { dispatch, match } = this.props;

    this.refreshGame();
    this.refreshPlayerList();
    socket.emit(socketEvents.JOIN_SOCKET_ROOM, match.params.accessCode);
    socket.on(socketEvents.JOIN_GAME, this.refreshPlayerList);
    socket.on(socketEvents.UPDATE_PLAYER, this.refreshPlayerList);
    socket.on(socketEvents.TOGGLE_READY, () => {
      this.refreshPlayerList();
      this.refreshGame();
    });
    socket.on(socketEvents.START_GAME, () => {
      dispatch(push(`/${match.params.accessCode}/game`));
    });
  }

  refreshPlayerList = () => {
    const { game, lobbyActions } = this.props;

    if (game) {
      lobbyActions.getPlayerList(game.id);
    } else {
      lobbyActions.getPlayerList(localStorage.getItem('gameId'));
    }
  };

  refreshGame = () => {
    const { lobbyActions, match } = this.props;

    lobbyActions.getGame(match.params.accessCode);
  };

  render() {
    const { game, lobbyActions, match, player, teams } = this.props;
    const { accessCode } = match.params;

    return (
      <section style={styles.container}>
        <Header accessCode={accessCode} />
        <div className="row around-xs">
          <div className="col-xs-3">
            <Team
              color="Red"
              spymaster={teams.redSpymaster}
              operatives={teams.redOperatives}
              player={player}
              accessCode={accessCode}
              pickRole={lobbyActions.pickRole}
            />
          </div>
          <div className="col-xs-3">
            <Team
              color="Blue"
              spymaster={teams.blueSpymaster}
              operatives={teams.blueOperatives}
              player={player}
              accessCode={accessCode}
              pickRole={lobbyActions.pickRole}
            />
          </div>
          <div className="col-xs-3">
            <Unassigned
              playerList={teams.unassigned}
              player={player}
              accessCode={accessCode}
              pickRole={lobbyActions.pickRole}
            />
          </div>
        </div>
        <div className="row">
          <Options
            game={game}
            player={player}
            accessCode={accessCode}
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
  lobbyActions: bindActionCreators(lobbyActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
