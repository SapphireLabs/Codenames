import React from 'react';

export default class Header extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>Waiting for players...</h1>
        <h4>Access Code: {this.props.accessCode}</h4>
      </div>
    );
  }
}
