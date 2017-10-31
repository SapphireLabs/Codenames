import axios from 'axios';

import actionTypes from './actionTypes';
import { generateAccessCode } from '../utils/menu';

// create game, then create player in that game using created gameId
export const createGameAndPlayer = formData => dispatch =>
  dispatch(createGame()).then(res =>
    dispatch(createPlayer(res.game, formData.name, true))
  );

// if game exists, create player using that gameId
// else, dispatch game not found
export const joinGameIfExists = formData => dispatch =>
  axios.get(`/api/games/${formData.accessCode}`).then(res => {
    const game = res.data[0];

    if (game) {
      dispatch(joinGame(game));
      return dispatch(createPlayer(game, formData.name, false));
    }

    throw new Error(`Game not found with access code ${formData.accessCode}`);
  });

/**
 * Generates an access code not in use, and creates game using it
 *
 * @return {Promise}
 */
const createGame = () => async dispatch => {
  let accessCode = generateAccessCode();

  try {
    const { data: games } = await axios.get(`/api/games`);
    const accessCodesInUse = new Set(games.map(game => game.accessCode));

    while (accessCodesInUse.has(accessCode)) {
      accessCode = generateAccessCode();
    }

    const { data: newGames } = await axios.post(`/api/games/${accessCode}`);

    return dispatch(createGameSuccess(newGames[0]));
  } catch (err) {
    throw new Error(`Error attempting to create new game: ${err}`);
  }
};

// create player in given gameId
const createPlayer = (game, name, host) =>
  axios.post(`api/players/${game.id}`, { name, host }).then(res => ({
    type: actionTypes.CREATE_PLAYER,
    player: res.data[0],
    accessCode: game.accessCode
  }));

/**
 * Action creator with payload of game object that was joined
 *
 * @param  {Object} game
 * @return {Object}
 */
const joinGame = game => ({
  type: actionTypes.JOIN_GAME,
  game
});

/**
 * Action creator with payload of game object that was created
 *
 * @param  {Object} game
 * @return {Object}
 */
const createGameSuccess = game => ({
  type: actionTypes.CREATE_GAME,
  game
});
