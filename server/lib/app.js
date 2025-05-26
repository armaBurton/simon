const cookieParser = require("cookie-parser");
const express = require("express");

const app = express();

const authRoutes = require("./auto-routes")

//Built in middleware
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes)

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
