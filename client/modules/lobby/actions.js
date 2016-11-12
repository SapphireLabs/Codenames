import axios from 'axios';

import * as t from './actionTypes';


// get player list using gameId
export const getPlayerList = (gameId) => {
  return axios.get(`/api/players/game/${gameId}`)
    .then(res => ({
      type: t.GET_PLAYER_LIST,
      playerList: res.data
    }));
};

// update player properties
export const updatePlayer = (player) => {
  return axios.put(`/api/players/${player.id}`, player)
    .then(res => ({
      type: t.UPDATE_PLAYER,
      player: res.data[0]
    }));
};
