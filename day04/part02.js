const fs = require("fs");

function isBetween(x, min, max) {
  return min <= x && x <= max;
}

function isValid(data) {
  const [, height, heightUnit] = (data.hgt || "").match(/^(\d+)(in|cm)$/) || [];
  return (
    isBetween(+data.byr, 1920, 2002) &&
    isBetween(+data.iyr, 2010, 2020) &&
    isBetween(+data.eyr, 2020, 2030) &&
    (heightUnit === "cm"
      ? isBetween(+height, 150, 193)
      : isBetween(+height, 59, 76)) &&
    /^#[0-9a-f]{6}$/.test(data.hcl || "") &&
    ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(data.ecl) &&
    /^\d{9}$/.test(data.pid || "")
  );
}

const passports = fs
  .readFileSync("day04/input.txt", "utf-8")
  .trim()
  .split("\n\n")
  .map((record) => {
    const entries = record.split(/\s+/).map((prop) => prop.split(":"));
    return Object.fromEntries(entries);
  })
  .filter(isValid);

console.log(passports.length);
