import { useEffect, useState } from "react";
import { useCurrentSimon } from "../../../context/SimonProvider";
import "../HighScores.css";

export const HighScoreRows = () => {
  const { topScores } = useCurrentSimon(); // If it's a Promise, we will handle it
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScores = async () => {
      try {
        const resolvedScores = await topScores; // wait for the promise
        setScores(resolvedScores);
      } catch (error) {
        console.error("FAILED TO FETCH SCORES:", error);
      } finally {
        setLoading(false);
      }
    };

    loadScores();
  }, [topScores]);

  if (loading) return <div>Loading scores...</div>;
  if (!scores || scores.length === 0) return <div>No Scores Available</div>;

  return (
    <>
      {scores.map((score) => (
        <div key={score.id} className="scoreRow">
          <h2 className="topScoreName">{score.username}</h2>
          <p className="topScorePoints">{score.score}</p>
        </div>
      ))}
    </>
  );
};
