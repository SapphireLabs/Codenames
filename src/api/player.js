import { ajax } from 'rxjs/observable/dom/ajax';

/**
 * POST new player
 *
 * @param  {number} gameId
 * @param  {string} name
 * @param  {boolean} host
 * @return {Observable<AjaxResponse>}
 */
export const createPlayer = (gameId, name, host) =>
  ajax({
    url: '/api/players',
    method: 'POST',
    body: { gameId, name, host }
  });

/**
 * GET list of players in a game
 *
 * @param  {number} gameId
 * @return {Observable<AjaxResponse>}
 */
export const getPlayerList = gameId =>
  ajax({
    url: `/api/players/game/${gameId}`,
    method: 'GET'
  });

/**
 * PATCH player properties
 * @param  {Object} player
 * @return {Observable<AjaxResponse>}
 */
export const updatePlayer = player =>
  ajax({
    url: `/api/players/${player.id}`,
    method: 'PATCH',
    body: player
  });
