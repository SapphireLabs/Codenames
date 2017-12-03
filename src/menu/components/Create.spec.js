import React from 'react';
import { shallow } from 'enzyme';

import { Create } from './Create';

const defaultProps = {
  // Mock redux-form handle submit with identity function
  handleSubmit: fn => fn,
  menuActions: {},
  pristine: true,
  submitting: false
};

const setupProps = options => ({ ...defaultProps, ...options });

describe('Create Menu Component', () => {
  it('should render without crashing', () => {
    shallow(<Create {...setupProps()} />);
  });

  it('should dispatch create game and player using name in formData on form submission', () => {
    const props = { menuActions: { createGameAndPlayer: jest.fn() } };
    const wrapper = shallow(<Create {...setupProps(props)} />);

    wrapper.find('form').simulate('submit', { name: 'test' });

    expect(props.menuActions.createGameAndPlayer.mock.calls.length).toBe(1);
    expect(props.menuActions.createGameAndPlayer.mock.calls[0][0]).toBe('test');
  });
});
