const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

const errorcontroller = require("./controllers/errorcontroller");
const todoItemRouter = require("./routes/todoItemRouter");

const app = express();

const PORT = process.env.PORT || 3001;
const DB_PATH = process.env.MONGODB_URI;
const FRONTEND_URL = process.env.FRONTEND_URL;
const allowedOrigins = ["http://localhost:5173", FRONTEND_URL].filter(Boolean);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Origin not allowed by CORS"));
    },
  })
);

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/api/todo", todoItemRouter);
app.use(errorcontroller.pageNotFound);

if (!DB_PATH) {
  console.error("Missing MONGODB_URI environment variable.");
  process.exit(1);
}

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
