import React from 'react';
import { shallow } from 'enzyme';

import { Create } from './Create';

const defaultProps = {
  handleSubmit: jest.fn(),
  menuActions: {},
  pristine: true,
  submitting: false,
};

const setupProps = (options) => ({ ...defaultProps, ...options });

describe('Create Menu Component', () => {
  it('should render without crashing', () => {
    shallow(<Create {...setupProps()} />);
  });
});
