import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';

import Menu from './modules/menu';
import Lobby from './modules/lobby';
import Game from './modules/game';


export default combineReducers({
  menu: Menu.reducer,
  lobby: Lobby.reducer,
  game: Game.reducer,
  form: FormReducer
});
