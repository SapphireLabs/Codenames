import React from 'react';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import io from 'socket.io-client';
import { TextField } from '@gfpacheco/redux-form-material-ui';
import Button from 'material-ui/Button';

import * as actions from '../actions';
import { validate } from '../../../utils/menu';

const socket = io();
const styles = {
  textInput: {
    margin: 12
  },
  button: {
    margin: 12
  }
}

class Join extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(formData) {
    // check if access code exists
    // if it does, create a new player using that gameId
    // else, display snackbar message showing game not found
    this.props.joinGameIfExists(formData)
      .then(res => {
        socket.emit('join game', res.accessCode);
        localStorage.setItem('playerId', res.player.id);
        localStorage.setItem('gameId', res.player.gameId);
        localStorage.setItem('accessCode', res.accessCode);
        browserHistory.push(`/${res.accessCode}/lobby`);
      })
  }


  // validated name input using redux-form
  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <Field
            name="accessCode"
            component={TextField}
            floatingLabelText="Enter access code"
            autoComplete="off"
          />
        </div>
        <div>
          <Field
            name="name"
            component={TextField}
            floatingLabelText="Enter name"
            autoComplete="off"
          />
        </div>
        <div>
          <Button
            raised
            label="Join Game"
            type="submit"
            disabled={pristine || submitting}
            primary={true}
            style={styles.button}
          />
          <Link to="/">
            <Button
              raised
              label="Back"
              secondary={true}
              style={styles.button}
            />
          </Link>
        </div>
      </form>
    );
  }
}

export default connect(null, actions)(reduxForm({
  form: 'JoinForm',
  validate
})(Join));
