import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';

import Menu from './menu';
import Lobby from './lobby';
import Game from './game';

export default combineReducers({
  menu: Menu.reducer,
  lobby: Lobby.reducer,
  game: Game.reducer,
  form: FormReducer
});
