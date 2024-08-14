import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import Order from "./Models/models.js";


dotenv.config();
const app = express();

app.use(bodyParser.json());
const mongoUri = process.env.MONGO_URI;

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.post("/order", async (req, res) => {
  const { userId, Products } = req.body;
    try {
    const order = new Order({
      user_id: userId,
      Products: Products.map(product => ({
        product_id: product.productId,
        quantity: product.quantity
      })),
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Error creating order", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/order/:id", (req, res) => {
  res.send("Order Updated");
});

app.delete("/order/:id", async (req, res) => {
  const orderId = req.params.id;
  const deletedOrder = await Order.findByIdAndDelete(orderId);
  if(!deletedOrder) {
    res.status(404).json({ error: 'Order not found' });
  }
  res.status(201).json("Order Removed");
});

app.get("/order/:id", async(req, res) => {
  const userId = req.params.id;
  console.log(userId);
  try {
    const orders = await Order.find({ user_id: userId }); 
    if (orders.length > 0) {
      res.status(200).json(orders);
    } else {
      res.status(404).json({ error: 'No orders found for this user' });
    }
  } catch (err) {
    console.error('Error retrieving orders', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
