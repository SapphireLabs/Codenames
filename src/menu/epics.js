import { Observable } from 'rxjs';
import { push } from 'react-router-redux';

import * as menuActions from './actions';
import actionTypes from './actionTypes';

/**
 * Triggered on create game and player action
 * Listens for completion of create game and player epics
 * Then redirects to lobby
 *
 * @param {Observable<Action>} action$
 * @param {Store} store
 * @param {Object} api
 * @return {Observable<Action>}
 */
export const createGameAndPlayerEpic = action$ =>
  action$.ofType(actionTypes.CREATE_GAME_AND_PLAYER).switchMap(
    () =>
      Observable.zip(
        action$.ofType(actionTypes.SET_GAME),
        action$.ofType(actionTypes.SET_PLAYER)
      )
        .switchMap(([action]) =>
          Observable.of(push(`/${action.game.accessCode}/lobby`))
        )
        .startWith(menuActions.createGame()) // Kick off sequence
  );

/**
 * Triggered on join game action
 * Listens for completion of get game and create player epics
 * Then redirects to lobby
 *
 * @param {Observable<Action>} action$
 * @param {Store} store
 * @param {Object} api
 * @return {Observable<Action>}
 */
export const joinGameEpic = action$ =>
  action$.ofType(actionTypes.JOIN_GAME).switchMap(
    () =>
      Observable.zip(
        action$.ofType(actionTypes.SET_GAME),
        action$.ofType(actionTypes.SET_PLAYER)
      )
        .switchMap(([action]) =>
          Observable.of(push(`/${action.game.accessCode}/lobby`))
        )
        .startWith(menuActions.joinGame()) // Kick off sequence
  );

/**
 * Creates a game and save in state
 *
 * @param {Observable<Action>} action$
 * @param {Store} store
 * @param {Object} api
 * @return {Observable<Action>}
 */
export const createGameEpic = (action$, store, { api }) =>
  action$.ofType(actionTypes.CREATE_GAME).switchMap(() =>
    api
      .createGame()
      .map(({ response: games }) => menuActions.setGame(games[0]))
      .catch(err => menuActions.setError(err))
  );

/**
 * Creates a host player for a new game
 *
 * @param {Observable<Action>} action$
 * @param {Store} store
 * @param {Object} api
 * @return {Observable<Action>}
 */
export const createHostPlayerEpic = (action$, store, { api }) =>
  Observable.zip(
    action$.ofType(actionTypes.CREATE_GAME_AND_PLAYER),
    action$.ofType(actionTypes.SET_GAME)
  ).mergeMap(([a1, a2]) =>
    api
      .createPlayer(a2.game.id, a1.name, true)
      .map(({ response: players }) => menuActions.setPlayer(players[0]))
      .catch(err => Observable.of(menuActions.setError(err)))
  );

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
