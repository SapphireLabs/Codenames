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
 * Action to trigger join game epic
 *
 * @param  {string} accessCode
 * @param  {string} name
 * @return {Object} action
 */
export const joinGame = (accessCode, name) => ({
  type: actionTypes.JOIN_GAME,
  accessCode,
  name
});

/**
 * Action to trigger find game epic
 *
 * @param  {string} accessCode
 * @return {Object} action
 */
export const findGame = accessCode => ({
  type: actionTypes.FIND_GAME,
  accessCode
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
