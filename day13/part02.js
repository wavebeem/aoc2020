const fs = require("fs");

const input = fs
  .readFileSync("day13/input.txt", "utf-8")
  .trim()
  .split("\n")[1]
  .split(",")
  .map((str, i) => {
    return {
      bus: Number(str),
      index: i,
    };
  })
  .filter((record) => record.bus);

function findFirstBusRun(buses) {
  let time = 0;
  while (true) {
    if (buses.every(({ bus, index }) => (time + index) % bus === 0)) {
      return time;
    }
    time++;
  }
}

// TODO: The "Chinese remainder theorem" supposedly helps with this problem.
// https://en.wikipedia.org/wiki/Chinese_remainder_theorem
const time = findFirstBusRun(input);
console.log(time);
