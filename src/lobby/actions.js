import axios from 'axios';

import actionTypes from './actionTypes';
import { isGameReady } from '../utils/game';

// get player list using gameId
export const getPlayerList = gameId =>
  axios.get(`/api/players/game/${gameId}`).then(res => ({
    type: actionTypes.GET_PLAYER_LIST,
    playerList: res.data
  }));

// get game using accessCode
export const getGame = accessCode =>
  axios.get(`/api/games/${accessCode}`).then(res => ({
    type: actionTypes.UPDATE_GAME,
    game: res.data[0]
  }));

// update player properties
export const updatePlayer = player =>
  axios.put(`/api/players/${player.id}`, player).then(res => ({
    type: actionTypes.UPDATE_PLAYER,
    player: res.data[0]
  }));

// update game properties
export const updateGame = game =>
  axios.put(`/api/games/${game.id}`, game).then(res => ({
    type: actionTypes.UPDATE_GAME,
    game: res.data[0]
  }));

// update player role, then also unready player and game
export const pickRole = player => dispatch =>
  dispatch(updatePlayer(player)).then(action =>
    dispatch(unreadyPlayer(action.player))
  );

// player ready
export const readyPlayer = player => dispatch => {
  player.status = 'ready';

  return (
    dispatch(updatePlayer(player))
      .then(() => axios.get(`/api/players/game/${player.gameId}`))
      // Check if all players are ready and game is valid
      .then(res => isGameReady(res.data))
      .then(
        ready =>
          ready
            ? // Dispatch updateGame to ready if game is valid
              dispatch(updateGame({ id: player.gameId, status: 'ready' }))
            : false
      )
  );
};

// player unready
export const unreadyPlayer = player => dispatch => {
  player.status = 'waiting';

  return (
    dispatch(updatePlayer(player))
      // game unready
      .then(() =>
        dispatch(updateGame({ id: player.gameId, status: 'waiting' }))
      )
  );
};

export const startGame = gameId => dispatch =>
  // generate words
  axios
    .post(`/api/words/game/${gameId}`)
    // then update game status
    .then(() => dispatch(updateGame({ id: gameId, status: 'in progress' })));
