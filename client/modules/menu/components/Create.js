import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

import * as actions from '../actions';
import { generateAccessCode, validate } from '../../../utils/menu';

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
    this.props.createGame(formData);
  }

  // createGame() {
  //   let accessCode = generateAccessCode();
  //   let created = false;
  //
  //   axios.get(`/api/games`)
  //   .then(res => {
  //     console.log(res)
  //     const accessCodesInUse = res.data.map(game => game.accessCode);
  //
  //     while (!created) {
  //       if (!accessCodesInUse.includes(accessCode)) {
  //         axios.post(`/api/games/${accessCode}`)
  //         .then(res => {
  //           console.log('New gameId: ', res.data);
  //         });
  //
  //         created = true;
  //       } else {
  //         accessCode = generateAccessCode();
  //         throw new Error('Access code already exists');
  //       }
  //     }
  //   });
  // }

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
