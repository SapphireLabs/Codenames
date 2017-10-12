import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { List, ListItem, ListSubHeader } from 'material-ui/List';
import Divider from 'material-ui/Divider';

export default class Team extends React.PureComponent {
  static propTypes = {
    accessCode: PropTypes.string.isRequired,
    pickRole: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired,
    spymaster: PropTypes.object.isRequired,
  };

  // Update player team and role in db, then socket emit update player list
  pickRole = (role) => {
    const { socket, accessCode, spymaster, pickRole, player, color } = this.props;

    // If spymaster already exists, exit
    if (role === 'Spymaster' && spymaster) return;
    // If current role is already picked, exit
    if (role === player.role && color === player.team) return;

    const updated = {
      id: player.id,
      status: 'waiting',
      team: color,
      role
    };

    pickRole(updated)
      .then(() => { socket.emit('update player', accessCode) });
  };

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
