module.exports = {
  queryHandler,
  getRandItems,
  generatePositions
};

function queryHandler(query, param, req, res, next) {
  const status = req.method === 'POST' ? 201 : 200;

  query(param)
  .then(resp => { res.status(status).json(resp) })
  .catch(err => { next(err) });
}

// get n items randomly from list
function getRandItems(list, n) {
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

// returns array of randomized positions for words
function generatePositions() {
  // Red or Blue goes first
  const first = Math.random() < 0.5 ? 'Red' : 'Blue';
  const second = first === 'Red' ? 'Blue' : 'Red';

  // initialize unshuffled
  // 9 of first color, 8 of second color, 7 civilians, and 1 assassin
  const teams = new Array(25);
  for (let i = 0; i < 25; i++) {
    teams[i] = i < 9 ? first : i < 17 ? second : i < 24 ? 'Civilian' : 'Assassin';
  }

  // return shuffled
  return getRandItems(teams, 25);
}
