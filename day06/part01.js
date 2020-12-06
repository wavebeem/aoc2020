const fs = require("fs");

const sum = fs
  .readFileSync("day06/input.txt", "utf-8")
  .trim()
  .split("\n\n")
  .map((group) => {
    const ch = group.replace(/\n/g, "");
    const set = new Set(ch);
    return set.size;
  })
  .reduce((a, b) => a + b, 0);

console.log(sum);
