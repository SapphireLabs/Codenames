import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

export default class Unassigned extends React.PureComponent {
  render() {
    return (
      <List>
        <Subheader>Team {this.props.color}</Subheader>
        <Subheader inset>Spymaster</Subheader>
        <Divider />
        <Subheader inset>Operatives</Subheader>
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
