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
        await fspromises.writeFile("./data.json", JSON.stringify(data),'utf-8');
        console.log("Data saved successfully");
        return true
        
    } catch (error) {
        console.log("MyWriteFile error", error.message);
        return false;
    }
}

module.exports = {
    myReadFile,
    myWriteFile
};