import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes";
import { db } from "./config/db";
import { redis } from "./config/redis";

dotenv.config();

const app = express();

app.use(express.json());

//  Routes
app.use("/", productRoutes);

// Health check 

app.get("/health", (req, res) => {
  res.send("OK");
});

// Test DB connection
db.query("SELECT 1")
  .then(() => console.log("DB Connected"))
  .catch(console.error);

// Test Redis
redis.on("connect", () => {
  console.log("Redis Connected");
});

//  Render PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

