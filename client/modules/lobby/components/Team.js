import React from 'react';
import axios from 'axios';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';


export default class Team extends React.PureComponent {
  constructor(props) {
    super(props);

    this.pickRole = this.pickRole.bind(this);
  }

  // update player team and role in db, then socket emit update player list
  pickRole(role) {
    const { socket, accessCode, spymaster, updatePlayer } = this.props;

    // if spymaster already exists, break
    if (role === 'Spymaster' && spymaster) return;

    const player = {
      id: this.props.playerId,
      team: this.props.color,
      role
    };

    updatePlayer(player)
      .then(() => { socket.emit('update player', accessCode) });
  }

  render() {
    const { color, spymaster, operatives } = this.props;

    return (
      <Card>
        <CardHeader title={`Team ${color}`} />
        <CardText>
          <List>
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
        </CardText>
      </Card>
    );
  }
}
