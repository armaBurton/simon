const { Router } = require("express");
const UserService = require("../services/UserService");
const authenticate = require("../middleware/authenticate");
const User = require("../models/User");

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 42;

module.exports = Router()
  .post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
      //check for existing user
      const proofOfLife = await pool.query(
        `
          SELECT *
          FROM users
          WHERE email = $1
        `, [email]
      )

      if (proofOfLife.rows.length > 0) {
        return res.status(400).json({ error: 'User already exists' })
      }

      // Hash password
      const saltRounds = process.env.SALT_ROUNDS;
      const password_hash = await bcrypt.hash(password, saltRounds)

      const newUser = await pool.query(
        `
        INSERT INTO users
          (email, password_hash)
        VALUES
          ($1, $2)
        RETURNING
          id, email
      `, [email, password_hash]
      )

      res.status(201).json({ user: newUser.rows[0] })
      
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Server error' })
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
      `, [email]
      )
      const user = rows[0];


      if (!user) return res.status(401).json({ error: 'Invalid email or password' });

      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) {
        return res.status(401).json({ error: 'Invalid email or password'})
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'your_jwt_secret', {
        expiresIn: `1 day`
      });

      res.json({ token, user: { id: user.id, email:user.email } })

    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Server error'})
    }
  })





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
