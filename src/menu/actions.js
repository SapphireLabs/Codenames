import axios from 'axios';

import * as t from './actionTypes';
import { generateAccessCode } from '../utils/menu';

// create game, then create player in that game using created gameId
export const createGameAndPlayer = (formData) => (dispatch) => {
  return dispatch(createGame())
    .then(res => dispatch(createPlayer(res.game, formData.name, true)));
};

// if game exists, create player using that gameId
// else, dispatch game not found
export const joinGameIfExists = (formData) => (dispatch) => {
  return axios.get(`/api/games/${formData.accessCode}`)
    .then(res => {
      const game = res.data[0];
      if (game) {
        dispatch(joinGame(game));
        return dispatch(createPlayer(game, formData.name, false));
      } else {
        console.log('game not found');
      }
    })
};

// generate access code, and create game if code is not in use
const createGame = () => {
  let accessCode = generateAccessCode();
  let created = false;

  return axios.get(`/api/games`)
    .then(res => {
      const accessCodesInUse = res.data.map(game => game.accessCode);

      while (!created) {
        if (!accessCodesInUse.includes(accessCode)) {
          return axios.post(`/api/games/${accessCode}`)
          .then(res => {
            created = true;
            
            return {
              type: t.CREATE_GAME,
              game: res.data[0]
            };
          });
        } else {
          accessCode = generateAccessCode();
        }
      }
    });
};

// create player in given gameId
const createPlayer = (game, name, host) => {
  return axios.post(`api/players/${game.id}`, { name, host })
    .then(res => ({
      type: t.CREATE_PLAYER,
      player: res.data[0],
      accessCode: game.accessCode
    }));
};

const joinGame = (game) => ({
  type: t.JOIN_GAME,
  game
});
