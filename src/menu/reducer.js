import Lobby from '../lobby';
import actionTypes from './actionTypes';


export default function(state = {}, action) {
  switch (action.type) {
    case actionTypes.CREATE_GAME: {
      return setGame(state, action.game);
    }
    case actionTypes.JOIN_GAME: {
      return setGame(state, action.game);
    }
    case actionTypes.CREATE_PLAYER: {
      return setPlayer(state, action.player);
    }
    case Lobby.actionTypes.UPDATE_PLAYER: {
      return setPlayer(state, action.player);
    }
    case Lobby.actionTypes.UPDATE_GAME: {
      return setGame(state, action.game);
    }
    default: {
      return state;
    }
  }
}

const setGame = (state, game) => Object.assign({}, state, { game });
const setPlayer = (state, player) => Object.assign({}, state, { player });
