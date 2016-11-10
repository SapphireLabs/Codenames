import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import * as actions from '../actions';

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
      <p>Lobby for game: {this.props.params.accessCode}</p>
    );
  }
}

const Lobby = connect(null, actions)(LobbyComponent);

export { Lobby };
