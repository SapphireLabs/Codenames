import * as menu from './menu';

describe('Utility functions - menu', () => {
  const REQUIRED_ERROR = 'Required';
  const NAME_ERROR =
    'Please enter an alphanumeric name shorter than 15 characters';
  const ACCESS_CODE_ERROR = 'Please enter a valid access code';

  it('should generate a random 4 letter access code', () => {
    const accessCode = menu.generateAccessCode();

    expect(accessCode.length).toBe(4);
    expect(accessCode).toEqual(expect.stringMatching(/[a-z]{4}/));
  });

  describe('validate form inputs', () => {
    it('should check that a name is given', () => {
      let values = {};
      let errors = menu.validate(values);

      expect(errors.name).toBe(REQUIRED_ERROR);

      values = { name: '       ' };
      errors = menu.validate(values);

      expect(errors.name).toBe(REQUIRED_ERROR);
    });

    it('should check that an access code is given', () => {
      let values = {};
      let errors = menu.validate(values);

      expect(errors.accessCode).toBe(REQUIRED_ERROR);

      values = { accessCode: '       ' };
      errors = menu.validate(values);

      expect(errors.accessCode).toBe(REQUIRED_ERROR);
    });

    it('should check that name is alphanumeric and less than 15 characters', () => {
      let values = { name: '#$' };
      let errors = menu.validate(values);

      expect(errors.name).toBe(NAME_ERROR);

      values = { name: 'aaaaaaaaaaaaaaaa' };
      errors = menu.validate(values);

      expect(errors.name).toBe(NAME_ERROR);
    });

    it('should check that access code is a combination of 4 letters', () => {
      const values = { accessCode: '#$' };
      const errors = menu.validate(values);

      expect(errors.accessCode).toBe(ACCESS_CODE_ERROR);
    });
  });
});
