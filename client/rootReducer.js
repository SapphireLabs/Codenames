import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';

import Menu from './modules/menu';


export default combineReducers({
  menu: Menu.reducer,
  form: FormReducer
});
