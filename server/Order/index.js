const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(bodyParser.json());
const mongoUri = process.env.MONGO_URI;

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.post("/order", (req, res) => {
  res.send("Order Created");
});

app.put("/order/:id", (req, res) => {
  res.send("Order Updated");
});

app.delete("/order/:id", (req, res) => {
  res.send("Order Removed");
});

app.get("/order", (req, res) => {
  res.send("Order List");
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
