const fs = require("fs");

const sum = fs
  .readFileSync("day06/input.txt", "utf-8")
  .trim()
  .split("\n\n")
  .map((group) => {
    const people = group.split("\n");
    const counts = new Map();
    for (const person of people) {
      for (const answer of person) {
        const prev = counts.get(answer) ?? 0;
        counts.set(answer, prev + 1);
      }
    }
    return Array.from(counts.values()).filter((val) => val === people.length)
      .length;
  })
  .reduce((a, b) => a + b, 0);

console.log(sum);
