const fs = require("fs");

const input = fs.readFileSync("day02/input.txt", "utf-8").trim().split("\n");

const validInputs = input.filter((line) => {
  const match = line.match(/^(\d+)-(\d+) (.): (.+)$/);
  if (!match) {
    return false;
  }
  const [, i, j, ch, passwd] = match;
  const first = passwd[Number(i) - 1] === ch;
  const second = passwd[Number(j) - 1] === ch;
  return first !== second; // logical XOR on booleans
});

console.log(validInputs.length);
