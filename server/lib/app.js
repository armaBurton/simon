// app.js
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const userController = require("./controllers/users");

const app = express();

//Built in middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/v1/users", require("./controllers/users"));
app.use("/api/v1/top_scores", require("./controllers/top_scores"));
app.use("/", (req, res) => {
  res.send('<h1 style="font-family: sans-serif">simon says...</h1>');
});
app.listen(7890, () => console.log("server running on port 7890"));

// Error handling & 404 middleware for when a request doesn't match and app routes
app.use(require("./middleware/not-found"));
app.use(require("./middleware/error"));

module.exports = app;
