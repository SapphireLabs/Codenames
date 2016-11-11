import React from 'react';

export default class Unassigned extends React.PureComponent {
  render() {
    return (
      <div>
        <h4>Unassigned Players</h4>
        {this.props.playerList.map((player, i) =>
          <p key={i}>{player.name}</p>
        )}
      </div>
    );
  }
}
