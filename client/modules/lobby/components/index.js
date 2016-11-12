import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

import * as actions from '../actions';
import * as selectors from '../selectors';
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
    const { redTeam, blueTeam, unassigned } = this.props;

    return (
      <GridList cols={3}>
        <Subheader>Lobby for game: {this.accessCode}</Subheader>
        <GridTile>
          <Team
            color="Red"
            playerList={redTeam}
          />
        </GridTile>
        <GridTile>
          <Team
            color="Blue"
            playerList={blueTeam}
          />
        </GridTile>
        <GridTile>
          <Unassigned playerList={unassigned} />
        </GridTile>
      </GridList>

    );
  }
}

const mapStateToProps = (state) => ({
  gameId: state.menu.game.id,
  redTeam: selectors.getRedTeam(state),
  blueTeam: selectors.getBlueTeam(state),
  unassigned: selectors.getUnassigned(state)
});

const Lobby = connect(mapStateToProps, actions)(LobbyContainer);

export { Lobby };
