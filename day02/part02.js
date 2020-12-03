const fs = require("fs");

const input = fs.readFileSync("day02/input.txt", "utf-8").trim().split("\n");

const validInputs = input.filter((line) => {
  const match = line.match(/^(\d+)-(\d+) (.): (.+)$/);
  if (!match) {
    return false;
  }
  const [, si, sj, ch, passwd] = match;
  const i = Number(si) - 1;
  const j = Number(sj) - 1;
  const first = passwd[i] === ch;
  const second = passwd[j] === ch;
  return first !== second; // logical XOR on booleans
});

console.log(validInputs.length);
