import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';


export default class Create extends React.PureComponent {
  render() {
    return (
      <div>
        <RaisedButton label="Create Game" primary={true} />
        <Link to="/">
          <RaisedButton label="Back" secondary={true} />
        </Link>
      </div>
    );
  }
}
