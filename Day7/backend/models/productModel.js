const mongoose = require('mongoose');

const productSchema =new mongoose.Schema(
    {
        discount: Number,
        company: String,
        title: String,
        price: Number,
        quantity: {type: Number,default:1,min:0},
        thumbnail: String
    }
);

const Product= mongoose.model('products',productSchema);
console.log("Model created");
module.exports=Product;    