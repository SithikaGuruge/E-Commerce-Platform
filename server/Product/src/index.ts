import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import rabbitmqConsumer from "./events/rabbitmq.consumer";
import productRoutes from "./routes/product.routes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4002;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce-products";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB - Product Service");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

// Initialize RabbitMQ Consumer
const initializeRabbitMQ = async () => {
  try {
    await rabbitmqConsumer.connect();
    console.log("✅ RabbitMQ Consumer initialized");
  } catch (error) {
    console.error("❌ Failed to initialize RabbitMQ Consumer:", error);
    // Don't exit - RabbitMQ is optional, service should still work
  }
};

initializeRabbitMQ();

// Routes
app.use("/api/products", productRoutes);

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Product Service is running",
    timestamp: new Date().toISOString(),
  });
});

// Root route
app.get("/", (_req, res) => {
  res.json({
    service: "Product Service",
    version: "1.0.0",
    status: "active",
  });
});

// Error handling middleware
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("Error:", err.message);
    res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
);

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await rabbitmqConsumer.disconnect();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Product Service is running on port ${PORT}`);
});

export default app;
