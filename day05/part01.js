const fs = require("fs");

function parseCodes(code) {
  return {
    rowCode: Array.from(code.slice(0, 7), (c) => (c === "F" ? "low" : "high")),
    colCode: Array.from(code.slice(7), (c) => (c === "L" ? "low" : "high")),
  };
}

function processCodes({ rowCode, colCode }) {
  return {
    row: binaryPartitionRange(rowCode, 0, 127),
    col: binaryPartitionRange(colCode, 0, 7),
  };
}

function binaryPartitionRange([code, ...rest], min, max) {
  const half = (max - min) / 2;
  if (rest.length === 0) {
    return code === "low" ? min : max;
  }
  if (code === "low") {
    return binaryPartitionRange(rest, min, Math.floor(min + half));
  }
  return binaryPartitionRange(rest, Math.ceil(min + half), max);
}

function getID(line) {
  const codes = parseCodes(line);
  const { row, col } = processCodes(codes);
  const id = row * 8 + col;
  return id;
}

const ids = fs
  .readFileSync("day05/input.txt", "utf-8")
  .trim()
  .split("\n")
  .map(getID);

console.log(Math.max(...ids));
