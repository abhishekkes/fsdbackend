const express = require("express");
const fspromises = require("fs/promises");
const { myReadFile, myWriteFile, createNewId } = require("./utils");
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server is working");
});

app.get("/products", async (req, res) => {
  try {
    const data = await myReadFile();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
app.post("/products", async (req, res) => {
  try {
    const arr = await myReadFile();
    console.log(arr);
    // arr.push(req.body);
    const p = [...arr, req.body];
    console.log(p);
    await myWriteFile(p);
    res.json({ status: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
    res.json({ status: "failed" });
  }
});

app.post("/product", async (req, res) => {
  try {
    const newproduct = req.body;
    const arr = await myReadFile();
    const id = createNewId(arr);
    newproduct.id = id;
    const p = [...arr, newproduct];
    console.log(p);
    await myWriteFile(p);
    res.json({ status: "success" });
    res.status(201);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
    res.json({ status: "failed" });
  }
});

app.patch("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id); // Convert id to number
    const arr = await myReadFile(); // Get the actual array

    console.log(arr); // Check data structure

    const index = arr.findIndex((r) => r.id === id);

    console.log(index);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.patch("/updateproduct/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const newProduct1 = req.body;
    const arr = await myReadFile("./data.json");

    const productIndex = arr.findIndex((obj) => obj.id == productId);

    if (productIndex != -1) {
      const oldProduct = arr[productIndex];
      const newProduct = { ...oldProduct, ...newProduct1 }; // Merge old and new product
      arr[productIndex] = newProduct;
      await myWriteFile(arr);

      res.json({
        status: "Success",
      });
      res.status(201);
    } else {
      res.json({
        status: "fail again",
      });
      res.status(404);
    }
  } catch (err) {
    console.log("Error:", err.message); // Fix the variable name from 'error' to 'err'
    res.json({
      status: "fail",
    });
    res.status(500);
  }
});

app.delete("/deleteid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let arr = await myReadFile();
    const newarr = arr.filter((r) => r.id !== Number(id));
    console.log(newarr);
    await myWriteFile(newarr);
    res.json({ status: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed" });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
