import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import List, { ListItem, ListItemText } from 'material-ui/List';

import socket, { socketEvents } from '../../common/socket';

export default class Unassigned extends React.PureComponent {
  static propTypes = {
    accessCode: PropTypes.string.isRequired,
    pickRole: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
    playerList: PropTypes.array.isRequired
  };

  // Unassign team and role in db, then socket emit update player list
  unpick = () => {
    const { accessCode, pickRole, player } = this.props;

    // If player is already unassigned, exit
    if (!player.team) return;

    const updated = {
      id: player.id,
      status: 'waiting',
      team: null,
      role: null
    };

    pickRole(updated).then(() => {
      socket.emit(socketEvents.UPDATE_PLAYER, accessCode);
    });
  };

  render() {
    return (
      <Card>
        <CardHeader title="Unassigned Operatives" onClick={this.unpick} />
        <CardContent>
          <List>
            {this.props.playerList.map(player => (
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
