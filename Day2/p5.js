const fspromises = require('fs/promises');

const myreadfile =async  ()=>{
   const res=await fspromises.readFile('./dummy.txt', 'utf8');
   console.log(res);
    
}


myreadfile();