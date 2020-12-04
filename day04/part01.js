const fs = require("fs");

const fields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const passports = fs
  .readFileSync("day04/input.txt", "utf-8")
  .trim()
  .split("\n\n")
  .map((record) => {
    const entries = record.split(/\s+/).map((prop) => prop.split(":"));
    return Object.fromEntries(entries);
  })
  .filter((data) => {
    return fields.every((f) => f in data);
  });

console.log(passports.length);
