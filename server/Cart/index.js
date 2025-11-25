import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import Cart from "./Models/models.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoUri = process.env.MONGO_URI;
const PORT = process.env.PORT || 4001;

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", service: "cart-service" });
});

app.post("/cart", (req, res) => {
  const { userId, Products } = req.body;
  const savedCart = new Cart({
    user_id: userId,
    Products: Products.map((product) => ({
      product_id: product.productId,
      quantity: product.quantity,
    })),
  });
  savedCart
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

app.put("/cart/:id", (req, res) => {
  res.send("Cart Updated");
});

app.delete("/cart/:id", async (req, res) => {
  try {
    const deleteCart = await Cart.findByIdAndDelete(req.params.id);
    if (deleteCart) {
      res.status(200).json({ message: "Cart Deleted" });
    } else {
      res.status(404).json({ error: "Cart Not Found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/cart/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const cart = await Cart.find({ user_id: userId });
    if (cart.length > 0) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: "Cart Not Found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Cart Service is running on port ${PORT}`);
});
