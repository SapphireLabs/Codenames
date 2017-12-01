import React from 'react';
import { shallow } from 'enzyme';

import { Menu } from './Menu';

const defaultProps = {
  error: null,
  menuActions: {}
};

const setupProps = options => ({ ...defaultProps, ...options });

describe('Main Menu Component', () => {
  it('should render without crashing', () => {
    shallow(<Menu {...setupProps()} />);
  });

  describe('Error Message', () => {
    it('should open snackbar when error props exists', () => {
      const props = { error: { response: { error: 'test error message' } } };
      const wrapper = shallow(<Menu {...setupProps(props)} />);
      const snackbar = wrapper.find('withStyles(Snackbar)');

      expect(snackbar.props().open).toBe(true);
      expect(snackbar.props().message.props.children).toBe(
        'test error message'
      );
    });

    it('should not have open snackbar when error props does not exist', () => {
      const wrapper = shallow(<Menu {...setupProps()} />);
      const snackbar = wrapper.find('withStyles(Snackbar)');

      expect(snackbar.props().open).toBe(false);
    });

    it('should dispatch remove error action when closing snackbar', () => {
      const props = {
        error: { response: { error: 'test error message' } },
        menuActions: { setError: jest.fn() }
      };
      const wrapper = shallow(<Menu {...setupProps(props)} />);
      const snackbar = wrapper.find('withStyles(Snackbar)');

      snackbar.props().onRequestClose();
      expect(props.menuActions.setError.mock.calls.length).toBe(1);
      expect(props.menuActions.setError.mock.calls[0][0]).toBe(null);
    });
  });
});
