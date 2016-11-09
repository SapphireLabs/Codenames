import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import axios from 'axios';

import { generateAccessCode } from '../../../utils/game';

export default class Create extends React.PureComponent {
  createGame() {
    let accessCode = generateAccessCode();
    let created = false;

    axios.get(`/api/games`)
    .then(res => {
      console.log(res)
      const accessCodesInUse = res.data.map(game => game.accessCode);

      while (!created) {
        if (!accessCodesInUse.includes(accessCode)) {
          axios.post(`/api/games/${accessCode}`)
          .then(res => {
            console.log('New gameId: ', res.data);
          });

          created = true;
        } else {
          accessCode = generateAccessCode();
          throw new Error('Access code already exists');
        }
      }
    });
  }

  render() {
    return (
      <div>
        <RaisedButton label="Create Game" primary={true} onClick={this.createGame} />
        <Link to="/">
          <RaisedButton label="Back" secondary={true} />
        </Link>
      </div>
    );
  }
}
