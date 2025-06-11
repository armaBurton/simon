const TopScores = require("../models/TopScores");

module.exports = class TopScoreService {
  static async getTopScores() {
    const topScores = await TopScores.getTopScores();

    return topScores;
  }

  static async addTopScore({ username, score }) {
    const topScore = await TopScores.addTopScore({ username, score });

    return topScore;
  }
};
