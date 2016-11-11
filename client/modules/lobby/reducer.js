import * as t from './actionTypes';
import menu from '../menu';

export default function(state = {}, action) {
  switch (action.type) {
    case menu.actionTypes.CREATE_PLAYER: {
      return addToPlayerList(state, action.player);
    }
    default: {
      return state;
    }
  }
}

function addToPlayerList(state, player) {
  const nextState = {};
  nextState.playerList = state.playerList || [];
  nextState.playerList.push(player);

  return nextState;
}
