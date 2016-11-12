import { createSelector } from 'reselect';

const getPlayerList = (state) => state.lobby.playerList

export const teamSelector = createSelector(
  getPlayerList,
  (playerList) => ({
    red: playerList.filter(player => player.team === 'Red'),
    blue: playerList.filter(player => player.team === 'Blue'),
    unassigned: playerList.filter(player => !player.team)
  })
);
