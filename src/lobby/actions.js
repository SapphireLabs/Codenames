import axios from 'axios';

import actionTypes from './actionTypes';
import { isGameReady } from '../utils/game';

/**
 * Action to trigger get player list epic
 *
 * @param  {number} gameId
 * @return {Object} action
 */
export const getPlayerList = gameId => ({
  type: actionTypes.GET_PLAYER_LIST,
  gameId
});

/**
 * Action to trigger update player epic
 *
 * @param  {Object} player
 * @return {Object} action
 */
export const updatePlayer = player => ({
  type: actionTypes.UPDATE_PLAYER,
  player
});

/**
 * Action to set player list in state
 *
 * @param  {Array} playerList
 * @return {Object} action
 */
export const setPlayerList = playerList => ({
  type: actionTypes.SET_PLAYER_LIST,
  playerList
});

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
