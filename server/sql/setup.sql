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

INSERT INTO top_scores (username, score)
VALUES
  ('Donkey Kong', 4),
  ('Hamburger Hotdog', 7),
  ('Doctor Zhivago', 3),
  ('Mega Man', 9),
  ('Farts McGee', 2),
  ('Monty Python', 5),
  ('Princess Pei Pei', 6),
  ('Hot Bob', 8),
  ('Mad Madame Mim', 1),
  ('Holly Golightly', 10);

SELECT * FROM top_scores
ORDER BY score DESC 
LIMIT 10;