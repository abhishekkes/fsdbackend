const fspromises = require('fs/promises');

const myReadFile =async (loc)=>{
    try{
        const data = await fspromises.readFile(loc, 'utf8');
        console.log(data);
        return data;
    }
    
catch(err) {
    console.log(err);
}
}

module.exports = {
    myReadFile,
};