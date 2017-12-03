import * as selectors from './selectors';

describe('Lobby Selectors', () => {
  it('should build object of team data from array of players in state', () => {
    const state = {
      lobby: {
        playerList: [
          { id: 1, team: 'Red', role: 'Spymaster' },
          { id: 2, team: 'Red', role: 'Operative' },
          { id: 3, team: 'Red', role: 'Operative' },
          { id: 4, team: 'Blue', role: 'Spymaster' },
          { id: 5, team: 'Blue', role: 'Operative' },
          { id: 6, team: 'Blue', role: 'Operative' },
          { id: 7, team: null }
        ]
      }
    };

    const teams = selectors.teamSelector(state);

    expect(teams).toEqual({
      redSpymaster: { id: 1, team: 'Red', role: 'Spymaster' },
      redOperatives: [
        { id: 2, team: 'Red', role: 'Operative' },
        { id: 3, team: 'Red', role: 'Operative' }
      ],
      blueSpymaster: { id: 4, team: 'Blue', role: 'Spymaster' },
      blueOperatives: [
        { id: 5, team: 'Blue', role: 'Operative' },
        { id: 6, team: 'Blue', role: 'Operative' }
      ],
      unassigned: [{ id: 7, team: null }]
    });
  });
});
