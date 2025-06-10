const pool = require("../utils/pool");

module.exports = class TopScores {
  id;
  username;
  score;
  createdAt;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.score = row.score;
    this.createAt = row.createAt;
  }

  static async getTopScores() {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM top_scores
      ORDER BY score DESC
      LIMIT 10
    `
    );

    return rows.map((row) => new TopScores(row));
  }

  static async addTopScore({ username, score, userId }) {
    const { rows } = await pool.query(
      `
      INSERT INTO secrets (username, score, user_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `[(username, score, userId)]
    );

    return new TopScores(rows[0]);
  }
};
