import React from 'react';
import { Link, browserHistory } from 'react-router';
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
            component={TextField}
            floatingLabelText="Enter name"
          />
        </div>
        <div>
          <RaisedButton
            label="Create Game"
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
  form: 'CreateForm',
  validate
})(Create));
