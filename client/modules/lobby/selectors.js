import { createSelector } from 'reselect';

const getPlayerList = (state) => state.lobby.playerList;

export const getRedTeam = createSelector(
  getPlayerList,
  (playerList) => playerList.filter(player => player.team === 'Red')
);

export const getBlueTeam = createSelector(
  getPlayerList,
  (playerList) => playerList.filter(player => player.team === 'Blue')
);

export const getUnassigned = createSelector(
  getPlayerList,
  (playerList) => playerList.filter(player => !player.team)
);
