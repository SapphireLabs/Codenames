import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';

export default class Unassigned extends React.PureComponent {
  static propTypes = {
    accessCode: PropTypes.string.isRequired,
    socket: PropTypes.object.isRequired,
    pickRole: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
  }

  // Unassign team and role in db, then socket emit update player list
  unpick = () => {
    const { socket, accessCode, pickRole, player } = this.props;

    // If player is already unassigned, exit
    if (!player.team) return;

    const updated = {
      id: player.id,
      status: 'waiting',
      team: null,
      role: null
    };

    pickRole(updated)
      .then(() => { socket.emit('update player', accessCode) });
  };

  render() {
    return (
      <Card>
        <CardHeader
          title="Unassigned Operatives"
          onClick={this.unpick}
        />
        <CardText>
          <List>
            {this.props.playerList.map((player, i) =>
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
