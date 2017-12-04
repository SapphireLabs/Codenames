import { actionTypes as lobbyActionTypes } from '../lobby';
import actionTypes from './actionTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case actionTypes.SET_ERROR:
      return { ...state, error: action.error };
    case actionTypes.SET_GAME:
      return { ...state, game: action.game };
    case actionTypes.SET_PLAYER:
      return { ...state, player: action.player };
    case lobbyActionTypes.UPDATE_GAME:
      return { ...state, game: action.game };
    case lobbyActionTypes.UPDATE_PLAYER:
      return { ...state, player: action.player };
    default:
      return state;
  }
}
