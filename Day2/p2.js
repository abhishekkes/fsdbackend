const fs = require('fs');
let readdata=()=>{
    let data=fs.readFileSync('./dummy.txt', 'utf8');
    return data;
}

module.exports = readdata;