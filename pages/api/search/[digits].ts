// Thanks Shiff!

import { NextApiRequest, NextApiResponse } from "next";

const pi = require("../../../pi.json").pi;

function indexOf(txt: string, search: string) {
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

function getBefore(index: number, amount: number) {
  let numbers = [];
  for (let i = 1; i <= amount; i++) {
    let n = pi.charAt(index - i);
    numbers.unshift(n);
  }
  return numbers.join("");
}

function getAfter(index: number, amount: number, length: number) {
  let numbers = [];
  for (let i = 1; i <= amount; i++) {
    let n = pi.charAt(index + length - 1 + i);
    numbers.push(n);
  }
  return numbers.join("");
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { digits },
  } = req;

  if (!digits || typeof digits !== "string") {
    return res.json({
      error: "Invalid input.",
    });
  }

  const index = indexOf(pi, digits);

  return res.json({
    index: index,
    search: digits,
    before: `...${getBefore(index, 5)}`,
    after: `${getAfter(index, 5, digits.length)}...`,
  });
};
