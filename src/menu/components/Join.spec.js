import React from 'react';
import { shallow } from 'enzyme';

import { Join } from './Join';

const defaultProps = {
  // Mock redux-form handle submit with identity function
  handleSubmit: fn => fn,
  menuActions: {},
  pristine: true,
  submitting: false
};

const setupProps = options => ({ ...defaultProps, ...options });

describe('Join Menu Component', () => {
  it('should render without crashing', () => {
    shallow(<Join {...setupProps()} />);
  });

  it('should dispatch join game and create player using name and accessCode in formData on form submission', () => {
    const props = { menuActions: { joinGame: jest.fn() } };
    const wrapper = shallow(<Join {...setupProps(props)} />);

    wrapper.find('form').simulate('submit', {
      accessCode: 'code',
      name: 'test'
    });

    expect(props.menuActions.joinGame.mock.calls.length).toBe(1);
    expect(props.menuActions.joinGame.mock.calls[0][0]).toBe('code');
    expect(props.menuActions.joinGame.mock.calls[0][1]).toBe('test');
  });
});
