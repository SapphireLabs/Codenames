import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import * as a from '../actions';

export default class Unassigned extends React.PureComponent {
  constructor(props) {
    super(props);

    this.unpick = this.unpick.bind(this);
  }

  // unassign team and role in db, then socket emit update player list
  unpick() {
    const { socket, accessCode } = this.props;

    const player = {
      id: this.props.playerId,
      team: null,
      role: null
    };

    a.updatePlayer(player)
      .then(() => { socket.emit('update player', accessCode) });
  }

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
