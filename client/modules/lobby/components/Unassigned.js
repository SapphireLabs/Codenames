import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

export default class Unassigned extends React.PureComponent {
  render() {
    return (
      <List>
        <Subheader inset>Unassigned Operatives</Subheader>
        {this.props.playerList.map((player, i) =>
          <ListItem
            key={i}
            primaryText={player.name}
          />
        )}
      </List>
    );
  }
}
