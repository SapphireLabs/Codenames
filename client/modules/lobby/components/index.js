import React from 'react';

class Lobby extends React.Component {
  render() {
    return (
      <p>Lobby for game: {this.props.params.accessCode}</p>
    );
  }
}

export { Lobby };
