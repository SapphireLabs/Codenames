import { createSelector } from 'reselect';

const getPlayerList = (state) => state.lobby.playerList

export const teamSelector = createSelector(
  getPlayerList,
  (playerList) => ({
    redSpymaster: playerList.filter(player => player.team === 'Red' && player.role === 'Spymaster')[0],
    redOperatives: playerList.filter(player => player.team === 'Red' && player.role !== 'Spymaster'),
    blueSpymaster: playerList.filter(player => player.team === 'Blue' && player.role === 'Spymaster')[0],
    blueOperatives: playerList.filter(player => player.team === 'Blue' && player.role !== 'Spymaster'),
    unassigned: playerList.filter(player => !player.team)
  })
);
