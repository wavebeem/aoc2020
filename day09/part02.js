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

function findTarget(input, windowSize) {
  for (let i = windowSize; i < input.length; i++) {
    const sums = [...new Set(pairSums(input.slice(i - windowSize, i)))];
    if (sums.every((sum) => sum !== input[i])) {
      return input[i];
    }
  }
  throw new Error("couldn't find target");
}

function findRange(input, target) {
  for (let i = 0; i < input.length - 1; i++) {
    let sum = input[i];
    let j = i + 1;
    while (j < input.length && sum < target) {
      sum += input[j];
      j++;
    }
    if (sum === target) {
      return input.slice(i, j);
    }
  }
  throw new Error("couldn't find contiguous sum");
}

const target = findTarget(input, 25);
const range = findRange(input, target);
const sum = Math.min(...range) + Math.max(...range);
console.log(sum);
