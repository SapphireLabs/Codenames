import React from 'react';
import { shallow } from 'enzyme';

import Start from './Start';

describe('Start Menu Component', () => {
  it('should render without crashing', () => {
    shallow(<Start />);
  });
});
