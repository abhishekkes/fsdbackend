const fs=require('fs');
let ans="Hello i am in the world";
fs.writeFileSync('./data.txt',ans);
let ans1="Hello i am in the world 344\n "; 
fs.writeFileSync('./data2.txt',ans1);
