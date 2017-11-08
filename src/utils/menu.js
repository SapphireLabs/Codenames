/**
 * Validates menu form text inputs
 *
 * @param  {Object} values
 * @return {Object}
 */
export const validate = values => {
  const errors = {};

  if (values.name && !/^[a-zA-Z0-9\s]{0,14}$/.test(values.name)) {
    errors.name =
      'Please enter an alphanumeric name shorter than 15 characters';
  }

  if (!values.name || values.name.trim() === '') {
    errors.name = 'Required';
  }

  if (values.accessCode && !/^[a-z]{4}$/.test(values.accessCode)) {
    errors.accessCode = 'Please enter a valid access code';
  }

  if (!values.accessCode || values.accessCode.trim() === '') {
    errors.accessCode = 'Required';
  }

  return errors;
};
