const fspromises = require('fs/promises');

const myreadfile = ()=>{
    const res=fspromises.readFile('./dummy.txt', 'utf8');
    res.then(()=>{console.log(res);});
    res.catch(err=>{console.log(err);});
    
}


myreadfile();