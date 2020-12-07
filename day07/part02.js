const fs = require("fs");

const ruleEntries = fs
  .readFileSync("day07/input.txt", "utf-8")
  .trim()
  .replace(/\s*bags?\s*/g, "")
  .replace(/\./g, "")
  .split("\n")
  .map((rule) => {
    const [key, rest] = rule.split(/\s*contain\s*/g);
    if (rest === "no other") {
      return [key, []];
    }
    const contents = rest.split(/\s*,\s*/g).map((thing) => {
      const [, sCount, color] = thing.match(/^(\d+) (.*)$/);
      return { count: Number(sCount), color };
    });
    return [key, contents];
  });

const rules = new Map(ruleEntries);

function totalBags(color) {
  return (rules.get(color) || [])
    .map(({ count, color }) => count * totalBags(color))
    .reduce((a, b) => a + b, 1);
}

function bagCount(color) {
  return totalBags(color) - 1;
}

console.log(bagCount("shiny gold"));
