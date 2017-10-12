import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import io from 'socket.io-client';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import * as menuActions from '../actions';
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

export class Create extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    menuActions: PropTypes.object.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
  };

  onSubmit = (formData) => {
    // create new access code and insert new game in db
    // insert new player associated with that game
    // redirect to lobby for that access code
    this.props.menuActions.createGameAndPlayer(formData)
      .then(res => {
        localStorage.setItem('playerId', res.player.id);
        localStorage.setItem('gameId', res.player.gameId);
        localStorage.setItem('accessCode', res.accessCode);
        browserHistory.push(`/${res.accessCode}/lobby`);
      });
  };

  renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
    const props = {};

    if (touched && error) {
      props.error = true;
      props.helperText = error;
    }

    return (
      <TextField
        {...props}
        {...input}
        label={label}
        autoComplete="off"
      />
    );
  };

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
            component={this.renderField}
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

const mapDispatchToProps = (dispatch) => ({
  menuActions: bindActionCreators(menuActions, dispatch),
});

export default connect(null, mapDispatchToProps)(reduxForm({
  form: 'CreateForm',
  touchOnChange: true,
  validate
})(Create));
