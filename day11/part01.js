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

function getNeighbors(map, x, y) {
  return [
    get(map, x + 1, y + 0), // N
    get(map, x + 1, y + 1), // NE
    get(map, x + 0, y + 1), // E
    get(map, x - 1, y + 1), // SE
    get(map, x - 1, y + 0), // S
    get(map, x - 1, y - 1), // SW
    get(map, x + 0, y - 1), // W
    get(map, x + 1, y - 1), // NW
  ].filter(Boolean);
}

function evolve(map, x, y) {
  const ch = get(map, x, y);
  if (ch === "L" && getNeighbors(map, x, y).every((n) => n !== "#")) {
    return "#";
  }
  if (
    ch === "#" &&
    getNeighbors(map, x, y).filter((n) => n === "#").length >= 4
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

async function main() {
  let prevMap = undefined;
  let currMap = input;
  do {
    prevMap = currMap;
    currMap = step(currMap, evolve);
  } while (!equals(prevMap, currMap));
  console.log(countSeats(currMap));
}

main();
