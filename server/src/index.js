import "express-async-errors";
import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDb } from "./config/db.js";
import portfolioRoutes from "./routes/portfolio.js";
import contactRoutes from "./routes/contact.js";
import { useMockStore } from "./utils/mockStore.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    mode: useMockStore() ? "memory" : "database"
  });
});

app.use("/api/portfolio", portfolioRoutes);
app.use("/api/contact", contactRoutes);

app.use((err, _req, res, _next) => {
  console.error("Global Error Handler:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

const start = async () => {
  try {
    if (!useMockStore()) {
      await connectDb();
    } else {
      console.log("Running portfolio API with in-memory fallback (no MongoDB configured).");
    }

    app.listen(PORT, () => {
      console.log(`Portfolio server running on ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

start();

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! Shutting down...", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! Shutting down...", err);
  process.exit(1);
});
