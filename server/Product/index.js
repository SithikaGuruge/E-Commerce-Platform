import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import Product from "./Models/models.js";
import cors from "cors";

dotenv.config();

const mongoUri = process.env.MONGO_URI;
const PORT = process.env.PORT || 4002;

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", service: "product-service" });
});

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

app.listen(PORT, () => {
  console.log(`Product Service is running on port ${PORT}`);
});
