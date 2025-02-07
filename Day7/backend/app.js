const express = require("express");
const { connectDB } = require("./config/dbConfig.js");
const Product = require("./models/productModel.js");
const User = require("./models/userModel.js");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const sendEmail = require("./utils/emailHelper.js");
const OTP = require("./models/otpModel.js");

app.use((req, res, next) => {
  console.log("request recieved...");
  next();
});
app.use(morgan());
app.use(cors());
app.use(express.json());
app.post("/products", async (req, res) => {
  //   res.send("Server is working");
  try {
    const newProduct = req.body;
    await Product.create(newProduct);
    console.log("---debug----");
    res.status(201);
    res.json({ message: "Product added successfully" });
  } catch (error) {
    console.log(error.message);
    console.log(error._message);
    console.log(error.name);
    if (error.name == "ValidationError") {
      res
        .status(400)
        .json({ status: "fail", message: "Data validation Failed" });
    } else {
      res.status(500).json({ status: "fail", message: "Server Error" });
    }
  }
});

// app.get('/api/products',async (req, res) => {
//     try{
//         const products = await Product.find({});
//         res.status(200);
//         res.json(products);
//     }catch(e){
//         console.error(e);
//         res.status(500).send('Server Error');
//     }
// });

// app.get('/api/products/:name',async (req, res) => {
//     try{
//         const product = await Product.findOne({ name: req.params.name });
//         if(!product) return res.status(404).json({ message: 'Product not found' });
//         res.json(product);
//     }catch(e){
//         console.error(e);
//         res.status(500).send('Server Error');
//     }

// });

// app.get("/api/products", async (req, res) => {
//     try {
//         const { q = "" } = req.query;  // Get search query from request
//         console.log(q);

//         let productQuery = Product.find(); // Initialize query

//         if (q.length > 0) {
//             const reg = new RegExp(q, "i");  // Case-insensitive regex
//             productQuery = productQuery.where('name').regex(reg);
//         }

//         const products = await productQuery.exec();  // Execute the query
//         res.json(products);

//     } catch (e) {
//         console.error(e);
//         res.status(500).send('Server Error');
//     }
// });

app.get("/api/products", async (req, res) => {
  try {
    const { q = "", size = 10, page = 1, fields = "-__v" } = req.query; // Get search query from request
    console.log(q);

    let productQuery = Product.find(); // Initialize query

    if (q.length > 0) {
      const reg = new RegExp(q, "i"); // Case-insensitive regex
      productQuery = productQuery.where("name").regex(reg);
    }
    productQuery.sort("name -title");
    productQuery.skip((page - 1) * size);
    productQuery.limit(size); // Limit the number of products per page
    productQuery.fields = "name";
    const products = await productQuery.exec(); // Execute the query
    res.json(products);
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});

app.post('/api/users', async (req, res) =>{
  try{
    const {otp,email,password} = req.body;
    const otpdoc=await OTP.findOne({
      createdAt: {$gte: Date.now()-(10*60*1000)},
      email: email,
    })
    if(!otpdoc){
      res.status(404);
      res.json({status:"fail",message:"otp expired"})
    }

    else{
      const hashotp=otpdoc.otp;
      const isotpvalid=await bcrypt.compare(otp.toString(),hashotp);
      if(isotpvalid){
        const salt=await bcrypt.genSalt(14);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=await User.create({
          email:email,
          password: hashedPassword,
        });
        res.status(201);
        res.json({ message: 'User registered successfully' });
        return;
      }
      else{
        res.status=401;
        res.json({status:"fail",message:"incorrect otp"})
      }
    }
    
    res.json(otpdoc);
  }
  catch(error){
    console.error(error);
    res.status(500).send('Server Error');
  }
})

app.post("/user/register", async (req, res) => {
  try {
    const newUser = req.body;
    const salt = await bcrypt.genSalt(14);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashedPassword;
    console.log(newUser.password);
    await User.create(newUser);
    res.status(201);
    res.json({ message: "User registered successfully" });
  } catch (e) {
    if (e.name === "ValidationError") {
      res
        .status(400)
        .json({
          status: "fail",
          message: "Validation failed",
          errors: e.errors,
        });
    } else {
      console.error(e);
      res.status(500).send("Server Error");
    }
  }
});

app.post("/api/otps/", async (req, res) => {
  try {
    const email = req.body.email;
    if (email && email.length > 0) {
      const otp = Math.floor(Math.random() * 9000 + 1000);
      const isEmailsent = await sendEmail(email, otp);
      if (isEmailsent) {
        const hashOtp = await bcrypt.hash(otp.toString(), 14);
        await OTP.create({email, otp: hashOtp});
        res
          .status(200)
          .json({ status: "Success", message: "OTP sent successfully" });
      } else {
        res.status(500).json({ status: "Fail", message: "Failed to send OTP" });
      }
    } else {
      res.status(400).json({ status: "Fail", message: "Email is required" });
    }
  } catch (error) {
    console.log(error.message);
    console.log(error._message);
    console.log(error.name);
    if (error.name == "ValidationError") {
      res
        .status(400)
        .json({ status: "fail", message: "Data validation Failed" });
    } else {
      res.status(500).json({ status: "fail", message: "Server Error" });
    }
  }
});
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
