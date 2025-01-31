const express=require('express');
const {connectDB} = require('./config/dbConfig.js');
const Product = require('./models/productModel.js');
const app=express();
app.use(express.json());
app.post('/products',(req,res) => {
    res.send('Server is working');
    const newProduct = req.body;
    Product.create(newProduct);
    res.send('Product added successfully');
    res.status(200);
    
    
});

app.listen(8000,() => {
    console.log('Server is running on port 8000');
});