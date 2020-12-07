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

function canContain(baseColor, targetColor) {
  const contents = rules.get(baseColor);
  return (
    contents &&
    contents.some((content) => {
      return (
        content.color === targetColor || canContain(content.color, targetColor)
      );
    })
  );
}

const canContainShinyGold = Array.from(rules.keys()).filter((c) => {
  return canContain(c, "shiny gold");
});

console.log(canContainShinyGold.length);
