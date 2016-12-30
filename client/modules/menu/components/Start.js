import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';


const styles = {
  button: {
    margin: '15px'
  }
}

export default class Start extends React.PureComponent {
  render() {
    return (
      <div>
        <Link to="/create">
          <RaisedButton label="New Game" primary={true} style={styles.button} />
        </Link>
        <Link to="/join">
          <RaisedButton label="Join Game" primary={true} style={styles.button} />
        </Link>
      </div>
    );
  }
}
