const fspromises = require("fs/promises");

const myReadFile =async ()=>{
    try {
        const data = await fspromises.readFile("./data.json", "utf8");
        const arr=JSON.parse(data);
        return arr;
        
    } catch (error) {
        console.log("MyReadFile error",error.message);
        return [];
    }
}


const myWriteFile = async (data) => {
    try {
        await fspromises.writeFile("./data.json", JSON.stringify(data));
        console.log("Data saved successfully");
        return true
        
    } catch (error) {
        console.log("MyWriteFile error", error.message);
        return false;
    }
}

const createNewId =(arr) => {
    const arrlength=arr.length;
    if(arrlength>0){
        return arr[arrlength-1].id+1;
    }
    else{
        return 1;
    }
}

module.exports = {
    myReadFile,
    myWriteFile,
    createNewId
};