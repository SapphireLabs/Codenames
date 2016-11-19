import React from 'react';
import Subheader from 'material-ui/Subheader';

export default class Header extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>Waiting for players...</h1>
        <Subheader>Access Code: {this.props.accessCode}</Subheader>
      </div>
    );
  }
}
