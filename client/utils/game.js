// get n items randomly from list
export function getRandItems(list, n) {
	const len = list.length;

	// shuffle in place n times and swap to end
	// return the last n elements
	for (let i = 0; i < n; i++) {
		const swap = Math.floor(Math.random() * (len-i))
		const temp = list[swap];
		list[swap] = list[len-1-i];
		list[len-1-i] = temp;
	}

	return list.slice(len-n);
}

// checks if game is valid and all players are ready
export function isGameReady(playerList) {
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
