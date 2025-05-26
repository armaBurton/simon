const TopScores = require("../models/TopScores");

module.exports = class TopScoreService {
  static async getTopScores() {
    const topScores = await TopScores.getTopScores();

    return topScores;
  }

  static async addTopScore({ email, score, userId }) {
    const topScore = await Secret.addSecret({ email, score, userId });

    return topScore;
  }
};
