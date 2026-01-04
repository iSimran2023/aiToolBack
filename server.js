import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Routes
import userRoutes from "./routes/user.route.js";
import promptRoutes from "./routes/prompt.route.js";
import chatRoutes from "./routes/chat.route.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// DB — uses Vercel env only (no dotenv!)
const MONGO_URI = process.env.MONGO_URI;
if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("DB error:", err.message));
}

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/aiTool", promptRoutes);
app.use("/api/v1/chat", chatRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    env: {
      MONGO_URI: !!MONGO_URI,
      JWT_PASSWORD: !!process.env.JWT_PASSWORD,
      NEW_GEMINI_KEY: !!process.env.NEW_GEMINI_KEY
    }
  });
});

export default app;