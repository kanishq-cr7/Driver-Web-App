const express = require("express");
const app = express();

const mediaTypeValidator = require("./src/middleware/mediaTypeValidator");
const apiRouter = require("./src/routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply the mediaTypeValidator to any request that sends a body (POST, PUT, PATCH)
app.use(mediaTypeValidator);

// Route all /api requests to the apiRouter
app.use("/api", apiRouter);

// A simple root endpoint to verify the server is running
app.get("/", (req, res) => {
  res.send("Hello, IFN666!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on :${port}`);
});

module.exports = app;