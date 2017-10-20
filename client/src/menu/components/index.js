import React from 'react';

import Start from './Start';
import Create from './Create';
import Join from './Join';
import MenuGrid from '../../common/layout/MenuGrid';

class Menu extends React.Component {
  render() {
    return (
      <MenuGrid>
        <div>
          <h1>Codenames</h1>
          {this.props.children}
        </div>
      </MenuGrid>
    );
  }
}

export { Menu, Start, Create, Join };
