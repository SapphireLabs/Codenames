import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

import utils from '../utils';
import * as menuActions from './actions';
import actionTypes from './actionTypes';

/**
 * Gets games, creates game, creates player as host in sequence and then
 * redirects to lobby
 *
 * @param {Observable<Action>} action$
 * @param {Store} store
 * @param {Object} api
 * @return {Observable<Action>}
 */
export const createGameAndPlayerEpic = action$ =>
  action$
    .ofType(actionTypes.CREATE_GAME_AND_PLAYER)
    .mergeMap(() => Observable.of(menuActions.getGames()));

/**
 * Gets list of games
 *
 * @param {Observable<Action>} action$
 * @param {Store} store
 * @param {Object} api
 * @return {Observable<Action>}
 */
export const getGamesEpic = (action$, store, { api }) =>
  action$.ofType(actionTypes.GET_GAMES).mergeMap(() =>
    api
      .getGames()
      .map(({ response: games }) => menuActions.setGames(games))
      .catch(err => menuActions.setError(err))
  );

/**
 * Generates an access code not in use, and creates game using it
 *
 * @param {Observable<Action>} action$
 * @param {Store} store
 * @param {Object} api
 * @return {Observable<Action>}
 */
export const createGameEpic = (action$, store, { api }) =>
  action$
    .ofType(actionTypes.CREATE_GAME_AND_PLAYER)
    .zip(action$.ofType(actionTypes.SET_GAMES))
    .take(1)
    .mergeMap(action => {
      console.log(action);
      const accessCodesInUse = new Set(action.games.map(g => g.accessCode));
      let accessCode = utils.generateAccessCode();

      while (accessCodesInUse.has(accessCode)) {
        accessCode = utils.generateAccessCode();
      }

      return api
        .createGame(accessCode)
        .map(({ response: games }) => menuActions.setGame(games[0]))
        .catch(err => menuActions.setError(err));
    });

/**
 * Create a new player for a given gameId, name, and isHost
 *
 * @param {Observable<Action>} action$
 * @param {Store} store
 * @param {Object} api
 * @return {Observable<Action>}
 */
export const createPlayerEpic = (action$, store, { api }) =>
  action$
    .ofType(actionTypes.CREATE_GAME_AND_PLAYER)
    .zip(action$.ofType(actionTypes.SET_GAME))
    .take(1)
    .mergeMap(action => {
      const { game } = store.getState().menu;

      return api
        .createPlayer(game.id, action.name, action.isHost)
        .map(({ response: players }) => menuActions.setPlayer(players[0]))
        .catch(err => Observable.of(menuActions.setError(err)));
    });

// if game exists, create player using that gameId
// else, dispatch game not found
// export const joinGameIfExists = formData => dispatch =>
//   axios.get(`/api/games/${formData.accessCode}`).then(res => {
//     const game = res.data[0];
//
//     if (game) {
//       dispatch(joinGame(game));
//       return dispatch(createPlayer(game, formData.name, false));
//     }
//
//     throw new Error(`Game not found with access code ${formData.accessCode}`);
//   });
// create player in given gameId
