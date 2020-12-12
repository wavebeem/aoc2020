const fs = require("fs");

const input = fs
  .readFileSync("day11/input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((str) => [...str]);

function step(map, fn) {
  return map.map((row, y) => {
    return row.map((_item, x) => {
      return fn(map, x, y);
    });
  });
}

function get(map, x, y) {
  return map?.[y]?.[x];
}

function findNextSeat(map, x, y, dx, dy) {
  let ch;
  do {
    x += dx;
    y += dy;
    ch = get(map, x, y);
  } while (ch === ".");
  return ch;
}

function getNeighbors(map, x, y) {
  return [
    findNextSeat(map, x, y, +1, +0), // N
    findNextSeat(map, x, y, +1, +1), // NE
    findNextSeat(map, x, y, +0, +1), // E
    findNextSeat(map, x, y, -1, +1), // SE
    findNextSeat(map, x, y, -1, +0), // S
    findNextSeat(map, x, y, -1, -1), // SW
    findNextSeat(map, x, y, +0, -1), // W
    findNextSeat(map, x, y, +1, -1), // NW
  ].filter(Boolean);
}

function evolve(map, x, y) {
  const ch = get(map, x, y);
  if (ch === "L" && getNeighbors(map, x, y).every((n) => n !== "#")) {
    return "#";
  }
  if (
    ch === "#" &&
    getNeighbors(map, x, y).filter((n) => n === "#").length >= 5
  ) {
    return "L";
  }
  return ch;
}

function equals(map1, map2) {
  return map1.every((row, y) => {
    return row.every((_, x) => {
      return get(map1, x, y) === get(map2, x, y);
    });
  });
}

function countSeats(map) {
  return map
    .flatMap((row) => {
      return row.map((item) => {
        return item === "#";
      });
    })
    .reduce((a, b) => a + b, 0);
}

async function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

let prevMap = undefined;
let currMap = input;
do {
  prevMap = currMap;
  currMap = step(currMap, evolve);
} while (!equals(prevMap, currMap));
console.log(countSeats(currMap));
