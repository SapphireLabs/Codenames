import React from 'react';

import Start from './Start';
import Create from './Create';
import Join from './Join';


class Menu extends React.Component {
  render() {
    return (
      <div>
        <h1>Codenames</h1>
        {this.props.children}
      </div>
    );
  }
}

export { Menu, Start, Create, Join };
