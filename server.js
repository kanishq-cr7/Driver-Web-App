// server.js
require("dotenv").config();

const express       = require("express");
const mongoose      = require("mongoose");
const helmet        = require("helmet");
const cors          = require("cors");
const rateLimiter   = require("./src/middleware/rateLimiter");
const mediaType     = require("./src/middleware/mediaTypeValidator");
const apiRouter     = require("./src/routes/index");

const app = express();

// 1. Connect MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


app.set("trust proxy", 1); // Trust the first proxy (e.g., ngrok)

// 2. Global Middleware
app.use(helmet());  
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(rateLimiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mediaType);

// 3. Routes
app.use("/api", apiRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message });
});

// 4. Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
