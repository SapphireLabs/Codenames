import { Observable } from 'rxjs';

import { actions as menuActions } from '../menu';
import * as lobbyActions from './actions';
import actionTypes from './actionTypes';

/**
 * Get player list for a given game id save in state
 *
 * @param {Observable<Action>} action$
 * @param {Store} store
 * @param {Object} api
 * @return {Observable<Action>}
 */
export const getPlayerListEpic = (action$, store, { api }) =>
  action$.ofType(actionTypes.GET_PLAYER_LIST).switchMap(action =>
    api
      .getPlayerList(action.gameId)
      .map(({ response: players }) => lobbyActions.setPlayerList(players))
      .catch(err => Observable.of(menuActions.setError(err)))
  );

/**
 * Update player properties and save in state
 *
 * @param {Observable<Action>} action$
 * @param {Store} store
 * @param {Object} api
 * @return {Observable<Action>}
 */
export const updatePlayer = (action$, store, { api }) =>
  action$.ofType(actionTypes.UPDATE_PLAYER).switchMap(action =>
    api
      .updatePlayer(action.player)
      .map(({ response: players }) => menuActions.setPlayer(players[0]))
      .catch(err => Observable.of(menuActions.setError(err)))
  );
