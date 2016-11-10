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
