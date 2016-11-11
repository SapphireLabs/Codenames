import * as t from './actionTypes';


export default function(state = {}, action) {
  switch (action.type) {
    case t.CREATE_GAME: {
      return setGame(state, action.game);
    }
    case t.JOIN_GAME: {
      return setGame(state, action.game);
    }
    case t.CREATE_PLAYER: {
      return setPlayer(state, action.player);
    }
    default: {
      return state;
    }
  }
}

const setGame = (state, game) => Object.assign(state, { game });
const setPlayer = (state, player) => Object.assign(state, { player });
