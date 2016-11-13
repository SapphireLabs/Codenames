import React from 'react';
import axios from 'axios';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import * as a from '../actions';


export default class Team extends React.PureComponent {
  constructor(props) {
    super(props);

    this.pickRole = this.pickRole.bind(this);
  }

  pickRole(role) {
    const { socket, accessCode } = this.props;

    const player = {
      id: this.props.playerId,
      team: this.props.color,
      role
    };

    a.updatePlayer(player)
      .then(() => { socket.emit('update player', accessCode) });
  }

  render() {
    const { color, spymaster, operatives } = this.props;

    return (
      <List>
        <Subheader>Team {color}</Subheader>
        <Subheader
          inset
          onClick={this.pickRole.bind(this, 'Spymaster')}
        >
          Spymaster
        </Subheader>
        {spymaster
        ? <ListItem
            primaryText={spymaster.name}
          />
        : null}
        <Divider />
        <Subheader
          inset
          onClick={this.pickRole.bind(this, 'Operative')}
        >
          Operatives
        </Subheader>
        {operatives.map((player, i) =>
          <ListItem
            key={i}
            primaryText={player.name}
          />
        )}
      </List>
    );
  }
}
