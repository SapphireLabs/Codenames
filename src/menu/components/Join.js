import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import { validate } from '../../utils/menu';
import * as menuActions from '../actions';

const styles = {
  input: {
    margin: 12,
    width: '100%'
  },
  button: {
    margin: 12
  }
};

export class Join extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    menuActions: PropTypes.object.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  onSubmit = formData => {
    // Check if access code exists
    // If it does, create a new player using that gameId
    // Else, display snackbar message showing game not found
    this.props.menuActions.joinGame(formData.accessCode, formData.name);
  };

  renderField = ({ input, label, meta: { touched, error } }) => {
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
        style={styles.input}
      />
    );
  };

  // Validated access code and name input using redux-form
  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <Field
            name="accessCode"
            type="text"
            label="Enter access code"
            component={this.renderField}
          />
        </div>
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
            Join Game
          </Button>
          <Link to="/">
            <Button raised color="accent" style={styles.button}>
              Back
            </Button>
          </Link>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
  menuActions: bindActionCreators(menuActions, dispatch)
});

export default connect(null, mapDispatchToProps)(
  reduxForm({
    form: 'JoinForm',
    touchOnChange: true,
    validate
  })(Join)
);
