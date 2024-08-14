import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import Cart from "./Models/models.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
const mongoUri = process.env.MONGO_URI;

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

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

app.delete("/cart/:id", (req, res) => {
  try {
    const deleteCart = Cart.deleteOne({ id: req.params.id });
    if (deleteCart) {
      res.status(200).send("Cart Deleted");
    } else {
      res.status(404).send("Cart Not Found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/cart/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const cart = Cart.find({ userId: userId });
    if (cart.length > 0) {
      res.status(200).send(cart);
    } else {
      res.status(404).send("Cart Not Found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(4001, () => {
  console.log("Server is running on port 4001");
});
