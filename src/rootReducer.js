import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { reducer as menuReducer } from './menu';
import { reducer as lobbyReducer } from './lobby';
import Game from './game';

export default combineReducers({
  menu: menuReducer,
  lobby: lobbyReducer,
  game: Game.reducer,
  form: formReducer
});
