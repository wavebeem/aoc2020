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

function rotate(x, y, value) {
  switch (mod(value, 360)) {
    case 0:
      return [x, y];
    case 90:
      return [-y, x];
    case 180:
      return [-x, -y];
    case 270:
      return [y, -x];
    default:
      throw new Error(`bad angle: ${value}`);
  }
}

let x = 0;
let y = 0;
let dx = 10;
let dy = 1;
for (const { type, value } of input) {
  switch (type) {
    case "N":
      dy += value;
      break;
    case "E":
      dx += value;
      break;
    case "S":
      dy -= value;
      break;
    case "W":
      dx -= value;
      break;
    case "L":
      [dx, dy] = rotate(dx, dy, value);
      break;
    case "R":
      [dx, dy] = rotate(dx, dy, -value);
      break;
    case "F":
      x += value * dx;
      y += value * dy;
      break;
  }
}
console.log(manhattanDistance(x, y));
