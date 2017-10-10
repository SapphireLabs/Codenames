import React from 'react';
import axios from 'axios';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { List, ListItem, ListSubHeader } from 'material-ui/List';
import Divider from 'material-ui/Divider';


export default class Team extends React.PureComponent {
  constructor(props) {
    super(props);

    this.pickRole = this.pickRole.bind(this);
  }

  // update player team and role in db, then socket emit update player list
  pickRole(role) {
    const { socket, accessCode, spymaster, pickRole, player, color } = this.props;

    // if spymaster already exists, break
    if (role === 'Spymaster' && spymaster) return;
    // if current role is already picked, break
    if (role === player.role && color === player.team) return;

    const updated = {
      id: player.id,
      status: 'waiting',
      team: color,
      role
    };

    pickRole(updated)
      .then(() => { socket.emit('update player', accessCode) });
  }

  render() {
    const { color, spymaster, operatives } = this.props;

    return (
      <Card>
        <CardHeader title={`Team ${color}`} />
        <CardText>
          <List>
            <ListSubHeader
              onClick={this.pickRole.bind(this, 'Spymaster')}
            >
              Spymaster
            </ListSubHeader>
            {spymaster
            ? <ListItem
                primaryText={spymaster.name}
              />
            : null}
            <Divider />
            <ListSubHeader
              onClick={this.pickRole.bind(this, 'Operative')}
            >
              Operatives
            </ListSubHeader>
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
