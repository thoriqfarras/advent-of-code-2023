const fs = require('fs');
const path = require('path');

const sampleInput = path.resolve(__dirname, 'sample-input.txt');
const input = path.resolve(__dirname, 'input.txt');

fs.readFile(input, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const numbers = '0123456789';
  const letterNumbers =
    'zero one two three four five six seven eight nine'.split(' ');
  let sum = 0;
  for (const line of data.split('\n')) {
    let p1 = 0;
    let p2 = line.length - 1;
    let x = '';
    let y = '';
    let xIsFound = false;
    let yIsFound = false;
    while (!xIsFound || !yIsFound) {
      if (!xIsFound) {
        if (numbers.includes(line.charAt(p1))) {
          x = line.charAt(p1);
          xIsFound = true;
        } else {
          for (let i = 3; i <= 5; i += 1) {
            let substringIndexOne = letterNumbers.indexOf(
              line.substring(p1, p1 + i)
            );

            if (substringIndexOne !== -1) {
              x = numbers.charAt(substringIndexOne);
              xIsFound = true;
              break;
            }
          }
        }
        p1 += 1;
      }

      if (!yIsFound) {
        if (!yIsFound && numbers.includes(line.charAt(p2))) {
          y = line.charAt(p2);
          yIsFound = true;
        } else {
          for (let i = 2; i < 5; i += 1) {
            let substringIndexTwo = letterNumbers.indexOf(
              line.substring(p2 - i, p2 + 1)
            );
            if (substringIndexTwo !== -1) {
              y = numbers.charAt(substringIndexTwo);
              yIsFound = true;
              break;
            }
          }
        }
        p2 -= 1;
      }
    }
    sum += +(x + y);
  }
  console.log(sum);
});
