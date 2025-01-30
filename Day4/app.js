const express= require('express');
const fspromises = require('fs/promises');
const { myReadFile, myWriteFile } = require('./utils');
const app=express();
app.use(express.json());
app.get('/',(req,res) => {
    res.send('Server is working');
});


app.get('/products',async (req,res) => {
    try {
        const data=await myReadFile();
        console.log(data);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
app.post('/products',async (req,res) => {
    try {
        const arr=await myReadFile();
        console.log(arr);
        // arr.push(req.body);
        const p=[...arr,req.body];
        console.log(p);
        await myWriteFile(p);
        res.json({status: 'success'});
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
        res.json({status: 'failed'});
        
    }
}
);

app.listen(8000,() => {
    console.log('Server is running on port 8000');
});