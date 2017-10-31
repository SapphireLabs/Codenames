import actionTypes from './actionTypes';

const initialState = {
  playerList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_PLAYER_LIST: {
      return getPlayerList(state, action.playerList);
    }
    default: {
      return state;
    }
  }
}

function getPlayerList(state, playerList) {
  return Object.assign({}, state, { playerList });
}
