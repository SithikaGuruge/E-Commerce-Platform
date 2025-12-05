import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import orderRoutes from "./routes/order.routes";
import cartRoutes from "./routes/cart.routes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce-orders";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB - Order Service");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

// Routes
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Order Service is running",
    timestamp: new Date().toISOString(),
  });
});

// Root route
app.get("/", (req, res) => {
  res.json({
    service: "Order Service",
    version: "1.0.0",
    status: "active",
  });
});

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error:", err.message);
    res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Order Service is running on port ${PORT}`);
});

export default app;
