import fs from 'fs';

const txt=fs.readFileSync('./dummy.txt', 'utf8');
console.log(txt);