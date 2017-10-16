import axios from 'axios';

import * as t from './actionTypes';
import { isGameReady } from '../utils/game';


// get player list using gameId
export const getPlayerList = (gameId) => {
  return axios.get(`/api/players/game/${gameId}`)
    .then(res => ({
      type: t.GET_PLAYER_LIST,
      playerList: res.data
    }));
};

// get game using accessCode
export const getGame = (accessCode) => {
  return axios.get(`/api/games/${accessCode}`)
    .then(res => ({
      type: t.UPDATE_GAME,
      game: res.data[0]
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

// update game properties
export const updateGame = (game) => {
  return axios.put(`/api/games/${game.id}`, game)
    .then(res => ({
      type: t.UPDATE_GAME,
      game: res.data[0]
    }));
};

// update player role, then also unready player and game
export const pickRole = (player) => (dispatch) => {
  return dispatch(updatePlayer(player))
    .then(action => dispatch(unreadyPlayer(action.player)));
};

// player ready
export const readyPlayer = (player) => (dispatch) => {
  player.status = 'ready';

  return dispatch(updatePlayer(player))
    .then(() => axios.get(`/api/players/game/${player.gameId}`))
    // check if all players are ready and game is valid
    .then(res => isGameReady(res.data))
    .then(ready => {
      // dispatch updateGame to ready if game is valid
      if (ready) {
        return dispatch(updateGame({ id: player.gameId, status: 'ready' }));
      } else {
        return;
      }
    });
};

// player unready
export const unreadyPlayer = (player) => (dispatch) => {
  player.status = 'waiting';

  return dispatch(updatePlayer(player))
    // game unready
    .then(() => dispatch(updateGame({ id: player.gameId, status: 'waiting' })));
};

export const startGame = (gameId) => (dispatch) => {
  // generate words
  return axios.post(`/api/words/game/${gameId}`)
    // then update game status
    .then(() => dispatch(updateGame({ id: gameId, status: 'in progress' })));
};
