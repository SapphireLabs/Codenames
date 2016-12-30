import React from 'react';

import Start from './Start';
import Create from './Create';
import Join from './Join';


const styles = {
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  }
};

class Menu extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <div>
          <h1>Codenames</h1>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export { Menu, Start, Create, Join };
