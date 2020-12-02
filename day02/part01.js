const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
  .trim()
  .split("\n");

const validInputs = input.filter((line) => {
  const match = line.match(/^(\d+)-(\d+) (.): (.+)$/);
  if (!match) {
    return false;
  }
  const [, sMin, sMax, ch, passwd] = match;
  const min = Number(sMin);
  const max = Number(sMax);
  const count = Array.from(passwd).filter((c) => c === ch).length;
  return min <= count && count <= max;
});

console.log(validInputs.length);
