import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs';

import socket, { socketEvents } from '../common/socket';
import * as menuEpics from './epics';
import * as menuActions from './actions';
import actionTypes from './actionTypes';

describe('Menu Epics', () => {
  beforeEach(() => {
    // Mock socket emit
    socket.emit = jest.fn();
  });

  describe('Create game and player epic', () => {
    it('should emit join socket room and redirect after observing set game and set player actions in sequence', () => {
      const action$ = ActionsObservable.of(
        menuActions.createGameAndPlayer('test name'),
        menuActions.setGame({ id: 1, accessCode: 'code' }),
        menuActions.setPlayer({ id: 1, name: 'test name' })
      );

      menuEpics
        .createGameAndPlayerEpic(action$)
        .toArray()
        .subscribe(actions => {
          expect(socket.emit.mock.calls.length).toBe(1);
          expect(socket.emit.mock.calls[0][0]).toBe(
            socketEvents.JOIN_SOCKET_ROOM
          );
          expect(socket.emit.mock.calls[0][1]).toBe('code');
          expect(actions.length).toBe(2);
          expect(actions[0].type).toBe(actionTypes.CREATE_GAME);
          expect(actions[1].type).toBe('@@router/CALL_HISTORY_METHOD');
          expect(actions[1].payload.method).toBe('push');
          expect(actions[1].payload.args[0]).toBe('/code/lobby');
        });
    });
  });

  describe('Join game epic', () => {
    it('should emit join socket room and join game socket events and redirect after observing set game and set player actions in sequence', () => {
      const action$ = ActionsObservable.of(
        menuActions.joinGame('code', 'test name'),
        menuActions.setGame({ id: 1, accessCode: 'code' }),
        menuActions.setPlayer({ id: 1, name: 'test name' })
      );

      menuEpics
        .joinGameEpic(action$)
        .toArray()
        .subscribe(actions => {
          expect(socket.emit.mock.calls.length).toBe(2);
          expect(socket.emit.mock.calls[0][0]).toBe(
            socketEvents.JOIN_SOCKET_ROOM
          );
          expect(socket.emit.mock.calls[0][1]).toBe('code');
          expect(socket.emit.mock.calls[1][0]).toBe(socketEvents.JOIN_GAME);
          expect(socket.emit.mock.calls[1][1]).toBe('code');
          expect(actions.length).toBe(2);
          expect(actions[0].type).toBe(actionTypes.FIND_GAME);
          expect(actions[0].accessCode).toBe('code');
          expect(actions[1].type).toBe('@@router/CALL_HISTORY_METHOD');
          expect(actions[1].payload.method).toBe('push');
          expect(actions[1].payload.args[0]).toBe('/code/lobby');
        });
    });
  });

  describe('Find game epic', () => {
    it('should dispatch set game action on success', () => {
      const action$ = ActionsObservable.of(menuActions.findGame('code'));
      const response = { response: { id: 1, accessCode: 'code' } };
      const api = {
        getGameByAccessCode: accessCode => Observable.of(response)
      };

      menuEpics
        .findGameEpic(action$, null, { api })
        .toArray()
        .subscribe(actions => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(actionTypes.SET_GAME);
          expect(actions[0].game).toEqual({ id: 1, accessCode: 'code' });
        });
    });

    it('should dispatch set error action on failure', () => {
      const action$ = ActionsObservable.of(menuActions.findGame('code'));
      const response = { message: 'test error' };
      const api = {
        getGameByAccessCode: accessCode => Observable.throw(response)
      };

      menuEpics
        .findGameEpic(action$, null, { api })
        .toArray()
        .subscribe(actions => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(actionTypes.SET_ERROR);
          expect(actions[0].error.message).toBe('test error');
        });
    });
  });

  describe('Create game epic', () => {
    it('should dispatch set game action on success', () => {
      const action$ = ActionsObservable.of(menuActions.createGame());
      const response = { response: { id: 1, accessCode: 'code' } };
      const api = {
        createGame: () => Observable.of(response)
      };

      menuEpics
        .createGameEpic(action$, null, { api })
        .toArray()
        .subscribe(actions => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(actionTypes.SET_GAME);
          expect(actions[0].game).toEqual({ id: 1, accessCode: 'code' });
        });
    });

    it('should dispatch set error action on failure', () => {
      const action$ = ActionsObservable.of(menuActions.createGame());
      const response = { message: 'test error' };
      const api = {
        createGame: () => Observable.throw(response)
      };

      menuEpics
        .createGameEpic(action$, null, { api })
        .toArray()
        .subscribe(actions => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(actionTypes.SET_ERROR);
          expect(actions[0].error.message).toBe('test error');
        });
    });
  });

  describe('Create player epic', () => {
    let response;
    let api;
    let action$;

    beforeEach(() => {
      action$ = ActionsObservable.of(
        menuActions.createGameAndPlayer('test name'),
        menuActions.setGame({ id: 1 }),
        menuActions.createPlayer()
      );
    });

    it('should create a host player if triggered by create game and player action, and dispatch set player on success', () => {
      response = { response: { id: 2, name: 'test name' } };
      api = {
        createPlayer: jest.fn().mockReturnValue(Observable.of(response))
      };

      menuEpics
        .createPlayerEpic(action$, null, { api })
        .toArray()
        .subscribe(actions => {
          expect(api.createPlayer.mock.calls[0][2]).toBe(true); // isHost bool
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(actionTypes.SET_PLAYER);
          expect(actions[0].player).toEqual({ id: 2, name: 'test name' });
        });
    });

    it('should create a non-host player if triggered by join game action', () => {
      action$ = ActionsObservable.of(
        menuActions.joinGame('code', 'test name'),
        menuActions.setGame({ id: 1 }),
        menuActions.createPlayer()
      );
      response = { response: { id: 2, name: 'test name' } };
      api = {
        createPlayer: jest.fn().mockReturnValue(Observable.of(response))
      };

      menuEpics
        .createPlayerEpic(action$, null, { api })
        .toArray()
        .subscribe(actions => {
          expect(api.createPlayer.mock.calls[0][2]).toBe(false); // isHost bool
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(actionTypes.SET_PLAYER);
          expect(actions[0].player).toEqual({ id: 2, name: 'test name' });
        });
    });

    it('should dispatch set error action on failure', () => {
      response = { message: 'test error' };
      api = {
        createPlayer: () => Observable.throw(response)
      };

      menuEpics
        .createPlayerEpic(action$, null, { api })
        .toArray()
        .subscribe(actions => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(actionTypes.SET_ERROR);
          expect(actions[0].error.message).toBe('test error');
        });
    });
  });
});
