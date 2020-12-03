const fs = require("fs");

const tree = "#";

const input = fs
  .readFileSync("day03/input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((line) => Array.from(line));

const width = input[0].length;
const height = input.length;

function isTreeAt(x, y) {
  return input[y][x % width] === tree;
}

function getHitCount(dx, dy) {
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
  return hits;
}

const total =
  getHitCount(1, 1) *
  getHitCount(3, 1) *
  getHitCount(5, 1) *
  getHitCount(7, 1) *
  getHitCount(1, 2);

console.log(total);
