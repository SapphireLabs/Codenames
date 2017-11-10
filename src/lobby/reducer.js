import actionTypes from './actionTypes';

const initialState = {
  playerList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_PLAYER_LIST: {
      return { ...state, playerList: action.playerList };
    }
    default: {
      return state;
    }
  }
}
