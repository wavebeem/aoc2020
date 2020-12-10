const fs = require("fs");

const input = fs
  .readFileSync("day10/input.txt", "utf-8")
  .trim()
  .split("\n")
  .map(Number)
  .sort((a, b) => Math.sign(a - b));

const target = input[input.length - 1] + 3;
const allJolts = [0, ...input, target];
const nodeByJolt = new Map();
for (const jolt of allJolts) {
  nodeByJolt.set(jolt, { jolt });
}
for (const jolt of allJolts) {
  const node = nodeByJolt.get(jolt);
  for (let offset of [1, 2, 3]) {
    const otherNode = nodeByJolt.get(jolt - offset);
    if (otherNode) {
      otherNode["plus" + offset] = node;
    }
  }
}

function countRoutes(node, target) {
  if (!node) {
    return 0;
  }
  if (node.jolt === target) {
    return 1;
  }
  return (
    countRoutes(node.plus1, target) +
    countRoutes(node.plus2, target) +
    countRoutes(node.plus3, target)
  );
}

const root = nodeByJolt.get(0);
console.log(countRoutes(root, target));
