import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';


export default class Join extends React.PureComponent {
  render() {
    return (
      <div>
        <RaisedButton label="Join Game" primary={true} />
        <Link to="/">
          <RaisedButton label="Back" secondary={true} />
        </Link>
      </div>
    );
  }
}
