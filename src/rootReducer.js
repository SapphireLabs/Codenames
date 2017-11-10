import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';

import { reducer as menuReducer } from './menu';
import Lobby from './lobby';
import Game from './game';

export default combineReducers({
  menu: menuReducer,
  lobby: Lobby.reducer,
  game: Game.reducer,
  form: FormReducer
});
