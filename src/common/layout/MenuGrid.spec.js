import React from 'react';
import { shallow } from 'enzyme';

import MenuGrid from './MenuGrid';

const defaultProps = {
  classes: {},
  children: <div />
};

const setupProps = (options) => ({ ...defaultProps, ...options });

describe('Menu Grid Layout Component', () => {
  it('should render without crashing', () => {
    shallow(<MenuGrid {...setupProps()} />);
  });
});
