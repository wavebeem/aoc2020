const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
  .trim()
  .split("\n")
  .map(Number);
for (const [i, n] of input.entries()) {
  for (const m of input.slice(i + 1)) {
    if (n + m === 2020) {
      console.log(n * m);
    }
  }
}
