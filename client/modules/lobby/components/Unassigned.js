import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';


export default class Unassigned extends React.PureComponent {
  constructor(props) {
    super(props);

    this.unpick = this.unpick.bind(this);
  }

  // unassign team and role in db, then socket emit update player list
  unpick() {
    const { socket, accessCode, updatePlayer, player } = this.props;

    const updated = {
      id: player.id,
      status: 'waiting',
      team: null,
      role: null
    };

    updatePlayer(updated)
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
