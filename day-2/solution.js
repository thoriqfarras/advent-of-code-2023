const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { formatWithOptions } = require('util');

const input = path.resolve(__dirname, 'input.txt');

const readStream = readline.createInterface({
  input: fs.createReadStream(input),
  crlfDelay: Infinity,
});

let sum = 0;
let powerSum = 0;
readStream.on('line', (line) => {
  const id = line.match(/\d+(\.\d+)?/g)[0];
  const fewest = new Map();
  const max = new Map([
    ['red', 12],
    ['green', 13],
    ['blue', 14],
  ]);

  const colors = line
    .substring(line.indexOf(':') + 2)
    .replaceAll(', ', ' ')
    .replaceAll('; ', ' ')
    .split(' ');

  for (let i = 1; i < colors.length; i += 2) {
    // // part one (uncomment)
    // if (max.get(colors[i]) < colors[i - 1]) {
    //   return;
    // }

    // part two
    if (!fewest.has(colors[i])) {
      fewest.set(colors[i], +colors[i - 1]);
    } else if (fewest.get(colors[i]) <= +colors[i - 1]) {
      fewest.set(colors[i], +colors[i - 1]);
    }
  }
  sum += +id; // part one (uncomment)
  powerSum += [...fewest.values()].reduce((acc, curr) => acc * curr, 1); // part two
});

readStream.on('close', () => {
  // File reading is complete
  console.log('File reading complete.');

  // part one
  console.log(sum);

  // part two
  console.log(powerSum);
});
