const mongoose = require('mongoose');

const productSchema =new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true,min: 1},
    title: {type: String, required: true},
    discount: {type: Number, required: true},
    description: {type: String, required: true},
    available: {type: String,enum:['in-stock','out-of-stock'], required: true},
},{timestamps:true});

const Product= mongoose.model('products',productSchema);
console.log("Model created");
module.exports=Product;    