import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import * as actions from '../actions';

const socket = io();

class LobbyComponent extends React.Component {
  componentDidMount() {
    socket.on('connect', () => {
      console.log('socket client connected');
    })
  }

  render() {
    return (
      <p>Lobby for game: {this.props.params.accessCode}</p>
    );
  }
}

const Lobby = connect(null, actions)(LobbyComponent);

export { Lobby };
