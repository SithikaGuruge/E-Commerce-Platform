import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors";
import User from "./Models/model.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoUri = process.env.MONGO_URI;
const PORT = process.env.PORT || 4003;

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", service: "user-service" });
});

app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send("User not found");
  }
});

app.post("/user", async (req, res) => {
  const user = new User(req.body);
  const savedUser = await user.save();
  res.status(201).send(savedUser);
});

app.put("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send("User not found");
  }
});

app.listen(PORT, () => {
  console.log(`User Service is running on port ${PORT}`);
});

