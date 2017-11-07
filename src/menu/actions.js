import actionTypes from './actionTypes';

/**
 * Action to trigger create game and player epic
 *
 * @param  {string} name
 * @return {Object} action
 */
export const createGameAndPlayer = name => ({
  type: actionTypes.CREATE_GAME_AND_PLAYER,
  name
});

/**
 * Action to trigger get games epic
 *
 * @return {Object} action
 */
export const getGames = () => ({
  type: actionTypes.GET_GAMES
});

/**
 * Action to trigger create game epic
 *
 * @return {Object} action
 */
export const createGame = () => ({
  type: actionTypes.CREATE_GAME
});

/**
 * Action to trigger create player epic
 *
 * @param  {string} name
 * @param  {boolean} isHost
 * @return {Object} action
 */
export const createPlayer = (name, isHost) => ({
  type: actionTypes.CREATE_PLAYER,
  name,
  isHost
});

/**
 * Action to set current game object in state
 *
 * @param  {Object} game
 * @return {Object} action
 */
export const setGame = game => ({
  type: actionTypes.SET_GAME,
  game
});

/**
 * Action to set games array in state
 *
 * @param  {Array} games
 * @return {Object} action
 */
export const setGames = games => ({
  type: actionTypes.SET_GAMES,
  games
});

/**
 * Action to set current player object in state
 *
 * @param  {Object} player
 * @return {Object} action
 */
export const setPlayer = player => ({
  type: actionTypes.SET_PLAYER,
  player
});

/**
 * Action to set error object in state
 *
 * @param  {Object} error
 * @return {Object} action
 */
export const setError = error => ({
  type: actionTypes.SET_ERROR,
  error
});
