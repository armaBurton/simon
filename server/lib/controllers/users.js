const { Router } = require("express");
const UserService = require("../services/UserService");
const authenticate = require("../middleware/authenticate");
const User = require("../models/User");
const pool = require("../utils/pool");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 42;

module.exports = Router()
  .post("/signup", async (req, res) => {
    const { email, password } = req.body;
    console.log("Received email:", email);
    try {
      //check for existing user
      const proofOfLife = await pool.query(
        `
          SELECT *
          FROM users
          WHERE email = $1
        `,
        [email]
      );

      if (proofOfLife.rows.length > 0) {
        console.log("User already exists:", email);
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash password
      const saltRounds = Number(process.env.SALT_ROUNDS || 13);
      const password_hash = await bcrypt.hash(password, saltRounds);
      // console.log("Salt rounds:", saltRounds);
      const newUser = await pool.query(
        `
        INSERT INTO users
          (email, password_hash)
        VALUES
          ($1, $2)
        RETURNING
          id, email
      `,
        [email, password_hash]
      );

      const user = newUser.rows[0];
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1 day" }
      );

      res
        .cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: ONE_DAY_IN_MS,
        })
        .status(201)
        .json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  })
  .post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      const { rows } = await pool.query(
        `
      SELECT *
      FROM users
      WHERE email = $1
      `,
        [email]
      );
      const user = rows[0];

      if (!user) return res.status(401).json({ error: "Invalid email" });

      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: `1 day`,
        }
      );

      res
        .cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ user: { id: user.id, email: user.email } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  })
  .get("/read-cookie", (req, res) => {
    const token = req.cookies[process.env.COOKIE_NAME];
    if (!token) return res.status(401).json({ error: "No cookie found" });

    try {
      const decoded = jwt.decode(token);
      console.log(decoded);
      res.json({ decoded });
    } catch (err) {
      res.status(400).json({ error: "Failed to decode token" });
    }
  })
  .get("/me", (req, res) => {
    try {
      const token = req.cookies[process.env.COOKIE_NAME];
      if (!token) return res.status(401).json({ error: "Not Authenticated" });

      const payload = jwt.verify(token, process.env.JWT_SECRET);
      res.json({ user: { id: payload.userId, email: payload.email } });
    } catch (error) {
      res.status(401).json({ error: "Invalid or expired token" });
    }
  })

  .post("/sessions", async (req, res, next) => {
    try {
      const user = await UserService.signIn(req.body);

      res
        .cookie(process.env.COOKIE_NAME, user, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
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
        .clearCookie(process.env.COOKIE_NAME, {
          httpOnly: true,
          sameSite: "lax",
          secure: false,
        })
        .json({ success: true, message: "Signed out successfully1" });
    } catch (error) {
      next(error);
    }
  });
