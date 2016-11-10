// generates random 4 letter access code
export function generateAccessCode() {
  let result = '';
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < 4; i++) {
    result += letters[Math.floor(Math.random() * 26)];
  }

  return result;
}

export function validate(values) {
  let errors = {};

  if (!values.name || values.name.trim() === '') errors.name = 'Required';
  if (values.name && !/^[a-zA-Z0-9]{0,14}$/.test(values.name)) {
    errors.name = 'Please enter an alphanumeric name shorter than 15 characters';
  }

  return errors;
}
