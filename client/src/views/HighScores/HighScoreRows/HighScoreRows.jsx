import { useEffect, useState } from "react";
import { useCurrentSimon } from "../../../context/SimonProvider";
import "../HighScores.css";

export const HighScoreRows = () => {
  const { topScores } = useCurrentSimon(); // If it's a Promise, we will handle it

  console.log("HighScoreRows", topScores);

  if (!topScores) return <div>Loading Scores...</div>;
  if (topScores.length === 0) return <div>No Scores Available</div>;

  return (
    <>
      {topScores.map((score) => (
        <div key={score.id} className="scoreRow">
          <h2 className="topScoreName">{score.username}</h2>
          <p className="topScorePoints">{score.score}</p>
        </div>
      ))}
    </>
  );
};
