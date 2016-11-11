import axios from 'axios';

import * as t from './actionTypes';


// get game state using gameId
export const getPlayerList = (gameId) => {
  return axios.get(`/api/players/game/${gameId}`)
    .then(res => ({
      type: t.GET_PLAYER_LIST,
      playerList: res.data
    }));
};
