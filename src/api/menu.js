import { ajax } from 'rxjs/observable/dom/ajax';

/**
 * GET list of games
 *
 * @return {Observable<AjaxResponse>}
 */
export const getGames = () =>
  ajax({
    url: '/api/games',
    method: 'GET'
  });

/**
 * GET game by accessCode
 *
 * @param  {string} accessCode
 * @return {Observable<AjaxResponse>}
 */
export const getGameByAccessCode = accessCode =>
  ajax({
    url: `/api/games/${accessCode}`,
    method: 'GET'
  });

/**
 * POST new game
 *
 * @param  {string} accessCode
 * @return {Observable<AjaxResponse>}
 */
export const createGame = accessCode =>
  ajax({
    url: '/api/games',
    method: 'POST',
    body: { accessCode }
  });

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
