import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

export default class Unassigned extends React.PureComponent {
  constructor(props) {
    super(props);

    this.pickRole = this.pickRole.bind(this);
  }

  pickRole() {
    console.log('pick role')
  }

  render() {
    return (
      <List>
        <Subheader>Team {this.props.color}</Subheader>
        <Subheader inset onClick={this.pickRole}>Spymaster</Subheader>
        <Divider />
        <Subheader inset onClick={this.pickRole}>Operatives</Subheader>
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
