// Thanks Shiff!

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

	function getBefore(index, amount) {
		let numbers = [];
		for (let i = 1; i <= amount; i++) {
			let n = pi.charAt(index - i);
			numbers.unshift(n);
		}
		return numbers.join("");
	}

	function getAfter(index, amount) {
		let numbers = [];
		for (let i = 1; i <= amount; i++) {
			let n = pi.charAt(index + digits.length - 1 + i);
			numbers.push(n);
		}
		return numbers.join("");
	}

	const index = indexOf(pi, digits);
	res.json({
		index: index,
		search: digits,
		before: `...${getBefore(index, 5)}`,
		after: `${getAfter(index, 5)}...`,
	});
};
