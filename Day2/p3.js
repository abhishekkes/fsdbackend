const fs=require('fs');

const cb=(err,data) => {
    if(err) console.log(err)
    console.log(data);
}


myreadfile=() => {
const data=fs.readFile('./dummy.txt','utf8',cb);
console.log(data);
}


myreadfile();
console.log("Hello world!");
myreadfile();