const fs = require("fs");

const input = fs
  .readFileSync("day01/input.txt", "utf-8")
  .trim()
  .split("\n")
  .map(Number);
for (const [i, n] of input.entries()) {
  for (const [j, m] of input.slice(i + 1).entries()) {
    for (const o of input.slice(j + 1)) {
      if (n + m + o === 2020) {
        console.log(n * m * o);
      }
    }
  }
}
