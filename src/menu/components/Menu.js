import React from 'react';
import { Route } from 'react-router-dom';

import Start from './Start';
import Create from './Create';
import Join from './Join';
import MenuGrid from '../../common/layout/MenuGrid';

const styles = {
  header: {
    textAlign: 'center'
  }
};

const Menu = () => (
  <MenuGrid>
    <div>
      <h1 style={styles.header}>Codenames</h1>
      <Route exact path="/" component={Start} />
      <Route path="/create" component={Create} />
      <Route path="/join" component={Join} />
    </div>
  </MenuGrid>
);

export default Menu;
