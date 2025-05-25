const cookieParser = require("cookie-parser");
const express = require("express");

const app = express();

//Built in middleware
app.use(express.json());
app.use(cookieParser);

app.use("api/v1/users", require("./controllers/users"));
app.use("api/v1/secrets", require("./controllers/secrets"));
app.use("/", (req, res) => {
  res.send('<h1 style="font-family: sans-serif">PeePee PooPoo</h1>');
});

// Error handling & 404 middleware for when a request doesn't match and app routes
app.use(require("./middleware/not-found"));
app.use(require("./middleware/error"));

module.exports = app;
