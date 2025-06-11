DROP TABLE IF EXISTS top_scores CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE top_scores (
  id BIGSERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  score INT NOT NULL CHECK (score >= 0),
  user_id BIGINT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_score_desc ON top_scores (score DESC);

INSERT INTO top_scores (username, score, created_at)
VALUES
  ('Donkey Kong', 4, null),
  ('Hamburger Hotdog', 7, null),
  ('Doctor Zhivago', 3, null),
  ('Mega Man', 9, null),
  ('Farts McGee', 2, null),
  ('Monty Python', 5, null),
  ('Princess Pei Pei', 6, null),
  ('Hot Bob', 8, null),
  ('Mad Madame Mim', 11, null),
  ('Holly Golightly', 10, null);

-- SELECT * FROM top_scores
-- ORDER BY score DESC 
-- LIMIT 10;