// We found out in part 1 that we can use _every_ adapter in a giant chain.
// That's our longest chain. Any other chain must be shorter, since the order
// must always be increasing. Given that, it seems like every "optional" adapter
// is a decision point that multiplies the number of routes available by 2. By
// optional I mean that in this sequence: 0, 1, 2, 3, 6 you could shorten it to
// 0, 3, 6 since each step is allowed to increase by a maximum of 3. Such an
// would need to be some power of 2 multiplied by the number of optional
// elements. For the solution with 19208 options, this could be at best 8 *
// 2401, and 2401 vastly exceeds the input size. So I guess that's probably
// wrong.

// Comments online suggested caching/memoization would be useful here.

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
