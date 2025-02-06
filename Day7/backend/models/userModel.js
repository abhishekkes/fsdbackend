const mongoose = require('mongoose');
const userSchema= new mongoose.Schema(
    {
        username: {type:String,required: true},
        password: {type:String,required: true,min:8,max: 30},
        email: {type:String,required: true,unique:true,trim:true},
    },
    {timestamps: true}
)


const User= mongoose.model('users',userSchema);
module.exports = User;
console.log("User Module Created");