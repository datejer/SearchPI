const pi = require("../../../pi.json").pi;

export default (req, res) => {
	const {
		query: { digits },
	} = req;

	function indexOf(txt, search) {
		let start = search.charAt(0);

		for (let i = 0; i < txt.length; i++) {
			if (txt.charAt(i) === start) {
				let found = true;

				for (let j = 1; j < search.length; j++) {
					if (txt.charAt(i + j) !== search.charAt(j)) {
						found = false;
						break;
					}
				}
				if (found) {
					return i;
				}
			}
		}

		return -1;
	}

	const index = indexOf(pi, digits);
	res.json({
		index: index - 1,
		search: digits,
	});
};
