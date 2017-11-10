/**
 * Generates a random 4 letter access code
 *
 * @return {string}
 */
exports.generateAccessCode = () => {
  let result = '';
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < 4; i++) {
    result += letters[Math.floor(Math.random() * 26)];
  }

  return result;
};
