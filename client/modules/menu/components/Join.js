import React from 'react';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

import * as actions from '../actions';
import { validate } from '../../../utils/menu';

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
            name="name"
            component={TextField}
            floatingLabelText="Enter name"
          />
        </div>
        <div>
          <Field
            name="accessCode"
            component={TextField}
            floatingLabelText="Enter access code"
          />
        </div>
        <div>
          <RaisedButton
            label="Join Game"
            type="submit"
            disabled={pristine || submitting}
            primary={true}
            style={styles.button}
          />
          <Link to="/">
            <RaisedButton
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
