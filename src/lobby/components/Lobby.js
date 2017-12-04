import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import Snackbar from 'material-ui/Snackbar';

import socket, { socketEvents } from '../../common/socket';
import LobbyGrid from '../../common/layout/LobbyGrid';
import { actions as menuActions } from '../../menu';
import * as lobbyActions from '../actions';
import { teamSelector } from '../selectors';
import Header from './Header';
import Team from './Team';
import Unassigned from './Unassigned';
import Options from './Options';

export class Lobby extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.object,
    game: PropTypes.object.isRequired,
    lobbyActions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    menuActions: PropTypes.object.isRequired,
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
    const { menuActions, match } = this.props;

    menuActions.getGame(match.params.accessCode);
  };

  handleCloseSnackbar = () => {
    this.props.menuActions.setError(null);
  };

  renderLobby = () => {
    const { error, game, lobbyActions, match, player, teams } = this.props;
    const { accessCode } = match.params;

    return [
      <LobbyGrid
        key="main"
        blueComponent={
          <Team
            color="Blue"
            spymaster={teams.blueSpymaster}
            operatives={teams.blueOperatives}
            player={player}
            accessCode={accessCode}
            pickRole={lobbyActions.pickRole}
          />
        }
        headerComponent={<Header accessCode={accessCode} />}
        optionsComponent={
          <Options
            game={game}
            player={player}
            accessCode={accessCode}
            readyPlayer={lobbyActions.readyPlayer}
            unreadyPlayer={lobbyActions.unreadyPlayer}
            startGame={lobbyActions.startGame}
          />
        }
        redComponent={
          <Team
            color="Red"
            spymaster={teams.redSpymaster}
            operatives={teams.redOperatives}
            player={player}
            accessCode={accessCode}
            pickRole={lobbyActions.pickRole}
          />
        }
        unassignedComponent={
          <Unassigned
            playerList={teams.unassigned}
            player={player}
            accessCode={accessCode}
            pickRole={lobbyActions.pickRole}
          />
        }
      />,
      <Snackbar
        key="snackbar"
        onRequestClose={this.handleCloseSnackbar}
        open={!!error}
        message={<span>{error && error.response.error}</span>}
      />
    ];
  };

  render() {
    return this.props.player ? this.renderLobby() : <Redirect to="/" />;
  }
}

const mapStateToProps = state => ({
  error: state.menu.error,
  game: state.menu.game,
  player: state.menu.player,
  teams: teamSelector(state)
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  lobbyActions: bindActionCreators(lobbyActions, dispatch),
  menuActions: bindActionCreators(menuActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
