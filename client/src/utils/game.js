// checks if game is valid and all players are ready
export function isGameReady(playerList) {
	// if any players are unassigned
	if (playerList.some(player => !player.team)) return false;

	// check if team has spymaster and at least one operative
  const teams = {};
  const playersReady = playerList.every(player => {
		if (!teams[player.team]) teams[player.team] = {};
    teams[player.team][player.role] = true;
    return player.status === 'ready';
  });
	const validTeam = (teams.Red && teams.Red.Spymaster && teams.Red.Operative) ||
		(teams.Blue && teams.Blue.Spymaster && teams.Blue.Operative);

	return playersReady && validTeam;
}
