const { Router } = require("express");
const UserService = require("../services/UserService");
const authenticate = require("../middleware/authenticate");
const User = require("../models/User");

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 42;

module.exports = Router()
  .post("/sessions", async (req, res, next) => {
    try {
      const user = await UserService.signIn(req.body);

      res
        .cookie(process.env.COOKIE_NAME, user, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .send({ message: "Signed in successfully!", user });
    } catch (error) {
      next(error);
    }
  })

  .post("/", async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);

      res.json(user);
    } catch (error) {
      next(error);
    }
  })
  .get("/", authenticate, (req, res, next) => {
    try {
      res.send(req.user);
    } catch (error) {
      next(error);
    }
  })
  .delete("/sessions", (req, res, next) => {
    try {
      res
        .clearCookie(process.env.COOKIE_NAME)
        .json({ success: true, message: "Signed out successfully1" });
    } catch (error) {
      next(error);
    }
  });
