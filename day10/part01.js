const fs = require("fs");

const input = fs
  .readFileSync("day10/input.txt", "utf-8")
  .trim()
  .split("\n")
  .map(Number)
  .sort((a, b) => Math.sign(a - b));

input.push(input[input.length - 1] + 3);

let currentJoltage = 0;
let countJoltDiff1 = 0;
let countJoltDiff3 = 0;
for (const jolt of input) {
  const diff = jolt - currentJoltage;
  if (diff === 1) {
    countJoltDiff1++;
  } else if (diff === 3) {
    countJoltDiff3++;
  }
  currentJoltage = jolt;
}

console.log(countJoltDiff1 * countJoltDiff3);
