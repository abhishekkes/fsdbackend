const express = require('express');
const app = express();
const {myReadFile} = require('./utils.js');

app.get('/', async (req, res) => {
    const data=await myReadFile('./data.json');
    const newdata=JSON.parse(data);
    console.log(newdata);
    res.json(newdata);
});


app.listen(8000, () => {
    console.log('Server is running on port 8000');
});