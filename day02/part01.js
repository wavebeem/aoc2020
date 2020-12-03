const fs = require("fs");

const input = fs.readFileSync("day02/input.txt", "utf-8").trim().split("\n");

const validInputs = input.filter((line) => {
  const match = line.match(/^(\d+)-(\d+) (.): (.+)$/);
  if (!match) {
    return false;
  }
  const [, min, max, ch, passwd] = match;
  const count = Array.from(passwd).filter((c) => c === ch).length;
  return Number(min) <= count && count <= Number(max);
});

console.log(validInputs.length);
