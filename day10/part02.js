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

function memo(f) {
  const cache = new Map();
  return (x) => {
    if (cache.has(x)) {
      return cache.get(x);
    }
    const y = f(x);
    cache.set(x, y);
    return y;
  };
}

const countRoutes = memo((node) => {
  if (node.jolt === target) {
    return 1;
  }
  return [node.plus1, node.plus2, node.plus3]
    .filter((x) => x)
    .map(countRoutes)
    .reduce((a, b) => a + b, 0);
});

const root = nodeByJolt.get(0);
console.log(countRoutes(root));
