import { Observable } from 'rxjs';
import { push } from 'react-router-redux';

import socket, { socketEvents } from '../common/socket';
import * as menuActions from './actions';
import actionTypes from './actionTypes';

/**
 * Listens for create game and player action
 * Then listens for completion of create game and player epics
 * Then redirects to lobby, and joins socket room for this game's access code
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
        .take(1)
        .switchMap(([action]) => {
          socket.emit(socketEvents.JOIN_SOCKET_ROOM, action.game.accessCode);
          return Observable.of(push(`/${action.game.accessCode}/lobby`));
        })
        .startWith(menuActions.createGame()) // Kick off sequence
  );

/**
 * Triggered on join game action
 * Listens for completion of get game and create player epics
 * Then redirects to lobby, and emits join game socket event to other players
 *
 * @param {Observable<Action>} action$
 * @param {Store} store
 * @param {Object} api
 * @return {Observable<Action>}
 */
export const joinGameEpic = action$ =>
  action$.ofType(actionTypes.JOIN_GAME).switchMap(
    action =>
      Observable.zip(
        action$.ofType(actionTypes.SET_GAME),
        action$.ofType(actionTypes.SET_PLAYER)
      )
        .take(1)
        .switchMap(() => {
          socket.emit(socketEvents.JOIN_SOCKET_ROOM, action.accessCode);
          socket.emit(socketEvents.JOIN_GAME, action.accessCode);
          return Observable.of(push(`/${action.accessCode}/lobby`));
        })
        .startWith(menuActions.getGame(action.accessCode)) // Kick off sequence
  );

/**
 * Get game by access code and save in state
 *
 * @param {Observable<Action>} action$
 * @param {Store} store
 * @param {Object} api
 * @return {Observable<Action>}
 */
export const getGameEpic = (action$, store, { api }) =>
  action$.ofType(actionTypes.GET_GAME).switchMap(action =>
    api
      .getGameByAccessCode(action.accessCode)
      .map(({ response: game }) => menuActions.setGame(game))
      .catch(err => Observable.of(menuActions.setError(err)))
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
      .map(({ response: game }) => menuActions.setGame(game))
      .catch(err => Observable.of(menuActions.setError(err)))
  );

/**
 * Listens for create game and player or join game actions
 * Then waits for set game action
 * Then creates a player for that game, host player if new game
 *
 * @param {Observable<Action>} action$
 * @param {Store} store
 * @param {Object} api
 * @return {Observable<Action>}
 */
export const createPlayerEpic = (action$, store, { api }) =>
  action$
    .ofType(actionTypes.CREATE_GAME_AND_PLAYER, actionTypes.JOIN_GAME)
    .zip(action$.ofType(actionTypes.SET_GAME))
    .mergeMap(([a1, a2]) =>
      api
        .createPlayer(
          a2.game.id,
          a1.name,
          a1.type === actionTypes.CREATE_GAME_AND_PLAYER
        )
        .map(({ response: player }) => menuActions.setPlayer(player))
        .catch(err => Observable.of(menuActions.setError(err)))
    );
