const fs = require("fs");

const instructions = fs
  .readFileSync("day08/input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((line) => {
    const [name, arg] = line.split(/\s+/);
    const value = Number(arg);
    return { name, value, line };
  });

function run(instructions) {
  let pc = 0;
  let acc = 0;
  const history = new Set();
  while (true) {
    const inst = instructions[pc];
    if (history.has(pc)) {
      return acc;
    } else {
      history.add(pc);
    }
    switch (inst.name) {
      case "nop":
        pc++;
        break;
      case "acc":
        acc += inst.value;
        pc++;
        break;
      case "jmp":
        pc += inst.value;
        break;
      default:
        throw new Error(`illegal instruction: ${inst.name}`);
    }
  }
}

console.log(run(instructions));
