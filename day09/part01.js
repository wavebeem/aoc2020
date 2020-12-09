const fs = require("fs");

const input = fs
  .readFileSync("day09/input.txt", "utf-8")
  .trim()
  .split("\n")
  .map(Number);

function* pairSums(list) {
  for (const a of list) {
    for (const b of list) {
      yield a + b;
    }
  }
}

const windowSize = 25;
for (let i = windowSize; i < input.length; i++) {
  const sums = [...new Set(pairSums(input.slice(i - windowSize, i)))];
  if (sums.every((sum) => sum !== input[i])) {
    console.log(input[i]);
    break;
  }
}
