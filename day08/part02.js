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

function run(instructions, i) {
  const newInst = [...instructions];
  if (newInst[i].name === "nop") {
    newInst[i] = {
      ...newInst[i],
      name: "jmp",
    };
  } else if (newInst[i].name === "jmp") {
    newInst[i] = {
      ...newInst[i],
      name: "nop",
    };
  } else {
    return undefined;
  }
  let pc = 0;
  let acc = 0;
  const history = new Set();
  while (pc < newInst.length) {
    const inst = newInst[pc];
    if (history.has(pc)) {
      return undefined;
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
  return acc;
}

for (let i = 0; i < instructions.length; i++) {
  const acc = run(instructions, i);
  if (acc !== undefined) {
    console.log(acc);
    break;
  }
}
