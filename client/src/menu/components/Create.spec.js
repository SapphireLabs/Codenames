import React from 'react';
import { mount } from 'enzyme';
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import Create from './Create';

const defaultProps = {
  handleSubmit: jest.fn(),
  menuActions: {},
  pristine: true,
  submitting: false,
};

const setupProps = (options) => ({ ...defaultProps, ...options });

describe('Create Menu Component', () => {
  let store;
  let onSave;

  beforeEach(() => {
    store = createStore(combineReducers({ form: formReducer }));
    onSave = jest.fn().mockReturnValue(Promise.resolve());
  });

  it('should render without crashing', () => {
    const props = {
      ...defaultProps,
      onSave,
    };

    mount(
      <Provider store={store}>
        <Create {...props} />
      </Provider>
    );
  });
});
