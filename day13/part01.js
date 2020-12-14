const fs = require("fs");

const input = fs.readFileSync("day13/input.txt", "utf-8").trim().split("\n");

const start = Number(input[0]);
const buses = input[1]
  .split(",")
  .filter((b) => b !== "x")
  .map(Number);

function findFirstBus(start, buses) {
  let time = start;
  while (true) {
    for (const bus of buses) {
      if (time % bus === 0) {
        return { bus, time };
      }
    }
    time++;
  }
}

const { bus, time } = findFirstBus(start, buses);
console.log((time - start) * bus);
