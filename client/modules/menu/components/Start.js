import React from 'react';
import Button from 'material-ui/Button';
import { Link } from 'react-router';


const styles = {
  button: {
    margin: '15px',
  },
};

export default class Start extends React.PureComponent {
  render() {
    return (
      <div>
        <Link to="/create">
          <Button raised color="primary" style={styles.button}>
            New Game
          </Button>
        </Link>
        <Link to="/join">
          <Button raised color="primary" style={styles.button}>
            Join Game
          </Button>
        </Link>
      </div>
    );
  }
}
