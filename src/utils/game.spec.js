import * as game from './game';

describe('Utility functions - game', () => {
  describe('isGameReady', () => {
    let playerList;

    beforeEach(() => {
      playerList = [
        { id: 1, team: 'Red', role: 'Spymaster', status: 'ready' },
        { id: 2, team: 'Red', role: 'Operative', status: 'ready' },
        { id: 3, team: 'Red', role: 'Operative', status: 'ready' },
        { id: 4, team: 'Blue', role: 'Spymaster', status: 'ready' },
        { id: 5, team: 'Blue', role: 'Operative', status: 'ready' },
        { id: 6, team: 'Blue', role: 'Operative', status: 'ready' },
        { id: 7, team: null }
      ];
    });

    it('should return false if any players are still unassigned', () => {
      expect(game.isGameReady(playerList)).toBe(false);
    });

    it('should return false if any team is missing a spymaster', () => {
      playerList[0] = { id: 1, team: null };

      expect(game.isGameReady(playerList)).toBe(false);
    });

    it('should return false if any team is missing an operative', () => {
      playerList[1] = { id: 2, team: null };
      playerList[2] = { id: 3, team: null };

      expect(game.isGameReady(playerList)).toBe(false);
    });

    it('should return false if any player is not ready', () => {
      playerList[1] = { id: 2, team: null };
      playerList[2] = { id: 3, team: null };

      expect(game.isGameReady(playerList)).toBe(false);
    });

    it(`should return true if teams are valid (both have spymasters and at
      least one operative) and all players are ready`, () => {
      playerList[6] = {
        id: 7,
        team: 'Blue',
        role: 'Operative',
        status: 'ready'
      };

      expect(game.isGameReady(playerList)).toBe(true);
    });
  });
});
