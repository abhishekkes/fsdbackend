const express = require("express");
const { connectDB } = require("./config/dbConfig.js");
const Product = require("./models/productModel.js");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
app.use((req,res,next) => {
  console.log("request recieved...");
  next();
})
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
        const { q = "",size=10,page=1, fields="-__v" } = req.query;  // Get search query from request
        console.log(q);

        let productQuery = Product.find(); // Initialize query

        if (q.length > 0) {
            const reg = new RegExp(q, "i");  // Case-insensitive regex
            productQuery = productQuery.where('name').regex(reg); 
        }
        productQuery.sort("name -title");
        productQuery.skip((page-1)*size);
        productQuery.limit(size);  // Limit the number of products per page
        productQuery.fields="name";
        const products = await productQuery.exec();  // Execute the query
        res.json(products);

    } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
    }
});


app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
