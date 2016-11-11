import * as t from './actionTypes';

const initialState = {
  playerList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case t.GET_PLAYER_LIST: {
      return getPlayerList(state, action.playerList);
    }
    default: {
      return state;
    }
  }
}

function getPlayerList(state, playerList) {
  return Object.assign({}, { playerList });
}
