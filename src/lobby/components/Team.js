import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import List, { ListItem, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import Divider from 'material-ui/Divider';

import socket, { socketEvents } from '../../common/socket';

export default class Team extends React.PureComponent {
  static propTypes = {
    accessCode: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    operatives: PropTypes.array.isRequired,
    pickRole: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
    spymaster: PropTypes.object
  };

  handleClickOperative = () => {
    this.pickRole('Operative');
  };

  handleClickSpymaster = () => {
    this.pickRole('Spymaster');
  };

  // Update player team and role in db, then socket emit update player list
  pickRole = role => {
    const { accessCode, spymaster, pickRole, player, color } = this.props;

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

    pickRole(updated).then(() => {
      socket.emit(socketEvents.UPDATE_PLAYER, accessCode);
    });
  };

  render() {
    const { color, spymaster, operatives } = this.props;

    return (
      <Card>
        <CardHeader
          title={`Team ${color}`}
          onClick={this.handleClickOperative}
        />
        <CardContent>
          <List subheader>
            <ListSubheader onClick={this.handleClickSpymaster}>
              Spymaster
            </ListSubheader>
            {spymaster ? (
              <ListItem>
                <ListItemText primary={spymaster.name} />
              </ListItem>
            ) : null}
            <Divider />
            <ListSubheader onClick={this.handleClickOperative}>
              Operatives
            </ListSubheader>
            {operatives.map(player => (
              <ListItem key={player.id}>
                <ListItemText primary={player.name} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  }
}
