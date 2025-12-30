import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./src/routes/authRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.REACT_URL,
    credentials: true, // If you are sending cookies (like your token)
  })
);
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.status(200).send("API is running 🚀");
});
app.use("/api", authRoutes);
app.use("/api/tasks", taskRoutes);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
