const Router = require("express");
const authenticate = require("../middleware/authenticate");
const TopScoreService = require("../services/TopScoreService");

module.exports = Router()
  .get("/", authenticate, async (req, res, next) => {
    try {
      const topScores = await TopScoreService.getTopScores();

      res.json(topScores);
    } catch (error) {
      next(error);
    }
  })
  .post("/", authenticate, async (req, res, next) => {
    try {
      const topScores = await TopScoreService.addTopScore(req.body);

      res.json(topScores);
    } catch (error) {
      next(error);
    }
  });
