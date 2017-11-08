const game = require('./game');

describe('Server utility functions - game', () => {
  it('should generate a random 4 letter access code', () => {
    const accessCode = game.generateAccessCode();

    expect(accessCode.length).toBe(4);
    expect(accessCode).toEqual(expect.stringMatching(/[a-z]{4}/));
  });
});
