import axios from 'axios';

import * as t from './actionTypes';
import { isGameReady } from '../../utils/game';


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

// player ready
// dispatch updatePlayer action
// check if all players are ready and game is valid
// dispatch updateGame to ready
export const readyPlayer = (dispatch) => (player) => {
  dispatch(updatePlayer(player))
    .then(() => axios.get(`/api/players/game/${player.gameId}`))
    .then(playerList => isGameReady(playerList))
    .then(ready => {
      if (ready) {

      } else {
        
      }
    })
};

// player unready
export const unreadyPlayer = () => {

};
