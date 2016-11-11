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
  }
  componentDidMount() {
    socket.emit('new room', this.accessCode);
  }

  render() {
    return (
      <section>
        <p>Lobby for game: {this.props.params.accessCode}</p>
        <Unassigned playerList={this.props.playerList} />
      </section>

    );
  }
}

const mapStateToProps = (state) => ({
  playerList: state.lobby.playerList
});

const Lobby = connect(mapStateToProps, actions)(LobbyComponent);

export { Lobby };
