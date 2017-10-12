import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import io from 'socket.io-client';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import * as actions from '../actions';
import { validate } from '../../../utils/menu';

const socket = io();
const styles = {
  textInput: {
    margin: 15
  },
  button: {
    margin: 15
  }
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => {
  const props = {};

  if (touched && error) {
    props.error = true;
    props.helperText = error;
  }

  return (
    <TextField
      { ...props }
      { ...input }
      label={label}
      autoComplete="off"
    />
  );
};

class Create extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(formData) {
    // create new access code and insert new game in db
    // insert new player associated with that game
    // redirect to lobby for that access code
    this.props.createGameAndPlayer(formData)
      .then(res => {
        localStorage.setItem('playerId', res.player.id);
        localStorage.setItem('gameId', res.player.gameId);
        localStorage.setItem('accessCode', res.accessCode);
        browserHistory.push(`/${res.accessCode}/lobby`);
      });
  }

  // validated name input using redux-form
  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <Field
            name="name"
            type="text"
            label="Enter name"
            component={renderField}
          />
        </div>
        <div>
          <Button
            raised
            color="primary"
            type="submit"
            disabled={pristine || submitting}
            style={styles.button}
          >
            Create Game
          </Button>
          <Link to="/">
            <Button
              raised
              color="accent"
              style={styles.button}
            >
              Back
            </Button>
          </Link>
        </div>
      </form>
    );
  }
}

export default connect(null, actions)(reduxForm({
  form: 'CreateForm',
  validate
})(Create));
