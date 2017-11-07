import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import * as menuActions from '../actions';
import { validate } from '../../utils/menu';

const styles = {
  input: {
    margin: 15,
    width: '100%'
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
    submitting: PropTypes.bool.isRequired
  };

  onSubmit = formData => {
    // Create new access code and insert new game in db
    // Insert new player associated with that game
    // Redirect to lobby for that access code
    // this.props.menuActions.createGameAndPlayer(formData).then(res => {
    //   localStorage.setItem('playerId', res.player.id);
    //   localStorage.setItem('gameId', res.player.gameId);
    //   localStorage.setItem('accessCode', res.accessCode);
    //   this.props.dispatch(push(`/${res.accessCode}/lobby`));
    // });
    this.props.menuActions.createGameAndPlayer(formData.name);
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

  // Validated name input using redux-form
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
  menuActions: bindActionCreators(menuActions, dispatch)
});

export default connect(null, mapDispatchToProps)(
  reduxForm({
    form: 'CreateForm',
    touchOnChange: true,
    validate
  })(Create)
);
