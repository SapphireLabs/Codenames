/**
 * Checks if game is valid and all players are ready
 *
 * @param  {Array}  playerList
 * @return {boolean}
 */
export const isGameReady = playerList => {
  // If any players are unassigned
  if (playerList.some(player => !player.team)) return false;

  // Check if team has spymaster and at least one operative
  const teams = {};

  playerList.forEach(player => {
    if (!teams[player.team]) teams[player.team] = {};
    teams[player.team][player.role] = true;
  });

  const validTeam =
    (teams.Red && teams.Red.Spymaster && teams.Red.Operative) ||
    (teams.Blue && teams.Blue.Spymaster && teams.Blue.Operative);
  const playersReady = playerList.every(player => player.status === 'ready');

  return playersReady && validTeam;
};
