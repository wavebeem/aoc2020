const fs = require("fs");

const input = fs
  .readFileSync("day10/input.txt", "utf-8")
  .trim()
  .split("\n")
  .map(Number)
  .sort((a, b) => Math.sign(a - b));

const target = input[input.length - 1] + 3;

function countPaths(input, start, end) {
  if (input.length === 0) {
    return end - start <= 3 ? 1 : 0;
  }
  let sum = 0;
  for (let i = 0; i < 3; i++) {
    if (input[i] - start <= 3) {
      sum += countPaths(input.slice(i + 1), input[i], end);
    }
  }
  return sum;
}

console.log(countPaths(input, 0, target));
