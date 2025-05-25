DROP TABLE IF EXISTS top_scores CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users {
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL
};

CREATE TABLE top_scores (
  id BIGSERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  score INT NOT NULL CHECK (score >= 0),
  user_id BIGINT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE INDEX idx_score_desc ON top_scores (score DESC);

INSERT INTO top_scores (username, score, user_id)
VALUES
  ("")