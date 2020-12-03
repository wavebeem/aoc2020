const path = require("path");
const fs = require("fs");

const tree = "#";
const dx = 3;
const dy = 1;

const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
  .trim()
  .split("\n")
  .map((line) => Array.from(line));

const width = input[0].length;
const height = input.length;

function isTreeAt(x, y) {
  return input[y][x % width] === tree;
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
