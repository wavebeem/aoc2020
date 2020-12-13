const fs = require("fs");

const input = fs
  .readFileSync("day12/input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((line) => ({
    type: line[0],
    value: Number(line.slice(1)),
  }));

function manhattanDistance(x, y) {
  return Math.abs(x) + Math.abs(y);
}

function mod(a, b) {
  return (a + b) % b;
}

function move(x, y, angle, value) {
  switch (mod(angle, 360)) {
    case 0:
      return [x, y + value];
    case 90:
      return [x - value, y];
    case 180:
      return [x, y - value];
    case 270:
      return [x + value, y];
    default:
      throw new Error(`bad angle ${angle}`);
  }
}

function rotate(angle, value) {
  return (angle + value) % 360;
}

let x = 0;
let y = 0;
let angle = 270;
for (const { type, value } of input) {
  switch (type) {
    case "N":
      [x, y] = move(x, y, 0, value);
      break;
    case "E":
      [x, y] = move(x, y, 270, value);
      break;
    case "S":
      [x, y] = move(x, y, 180, value);
      break;
    case "W":
      [x, y] = move(x, y, 90, value);
      break;
    case "L":
      angle = rotate(angle, value);
      break;
    case "R":
      angle = rotate(angle, -value);
      break;
    case "F":
      [x, y] = move(x, y, angle, value);
      break;
  }
}
console.log(manhattanDistance(x, y));
