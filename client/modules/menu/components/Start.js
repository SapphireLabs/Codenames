import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';


export default class Start extends React.PureComponent {
  render() {
    return (
      <div>
        <Link to="/create">
          <RaisedButton label="New Game" primary={true} />
        </Link>
        <Link to="/join">
          <RaisedButton label="Join Game" primary={true} />
        </Link>
      </div>
    );
  }
}
