const fs = require("fs");

const input = fs
  .readFileSync("day03/input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((line) => Array.from(line));

const dx = 3;
const dy = 1;
const width = input[0].length;
const height = input.length;

function isTreeAt(x, y) {
  return input[y][x % width] === "#";
}

let hits = 0;
let x = 0;
let y = 0;
while (y < height) {
  if (isTreeAt(x, y)) {
    hits++;
  }
  x += dx;
  y += dy;
}

console.log(hits);
