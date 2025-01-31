const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB =async () =>{
    try {
        await mongoose.connect('mongodb+srv://root:admin@cluster0.6hvst.mongodb.net/product?retryWrites=true&w=majority&appName=Cluster0');
        console.log("MongoDB Connected");    
    } catch (error) {
        console.log("DB Error: " + error);
        
    }
}

connectDB();