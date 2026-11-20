const fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
let a = Number(input[0]);
let b = Number(input[1]);

if (a >= 1 && a <= 1000 && b >= 1 && b <= 1000) {
    console.log(a + b);
}
