// app.js
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const userController = require("./controllers/users");

const app = express();

//Built in middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(cookieParser());
app.use(
  require("cors")({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/v1/users", require("./controllers/users"));
app.use("/api/v1/top_scores", require("./controllers/top_scores"));
app.use("/", (req, res) => {
  console.log("Root route hit");
  res.send('<h1 style="font-family: sans-serif">PeePee PooPoo</h1>');
});
app.listen(7890, () => console.log("server running on port 7890"));

// Error handling & 404 middleware for when a request doesn't match and app routes
app.use(require("./middleware/not-found"));
app.use(require("./middleware/error"));

module.exports = app;
