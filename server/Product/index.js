import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import Product from "./Models/models.js";
dotenv.config();
const mongoUri = process.env.MONGO_URI;

const app = express();
app.use(bodyParser.json());

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.json(savedProduct);
});

app.delete("/products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.json(deletedProduct);
});

app.put("/products/:id", async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id);
  res.json(updatedProduct);
});

app.listen(4002, () => {
  console.log("Server is running on port 4002");
});
