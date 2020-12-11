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
  return map?.[x]?.[y];
}

function countNeighbors(map, x, y, fn) {
  return [
    get(map, y + 1, x + 0), // N
    get(map, y + 1, x + 1), // NE
    get(map, y + 0, x + 1), // E
    get(map, y - 1, x + 1), // SE
    get(map, y - 1, x + 0), // S
    get(map, y - 1, x - 1), // SW
    get(map, y + 0, x - 1), // W
    get(map, y + 1, x - 1), // NW
  ]
    .filter(Boolean)
    .map(fn)
    .filter(Boolean).length;
}

function evolve(map, x, y) {
  const ch = get(map, x, y);
  if (
    ch === "L" &&
    countNeighbors(map, x, y, (n) => n === "L" || n === ".") === 8
  ) {
    return "#";
  }
  if (ch === "#" && countNeighbors(map, x, y, (n) => n === "#") >= 4) {
    return "L";
  }
  return ch;
}

function equals(map1, map2) {
  return map1.every((_, y) => {
    return map1.every((_, x) => {
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

function show(map) {
  console.clear();
  console.log(map.map((row) => row.join("")).join("\n"));
}

function sleep() {
  let i = 1e9;
  while (i--) {}
}

let prevMap = undefined;
let currMap = input;
do {
  prevMap = currMap;
  currMap = step(currMap, evolve);
  console.log(Date());
  show(currMap);
  sleep();
} while (!equals(prevMap, currMap));
console.log(countSeats(currMap));
