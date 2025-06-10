import { useEffect, useState } from "react";
import { useCurrentSimon } from "../../../context/SimonProvider";
import "../HighScores.css";

export const HighScoreRows = async () => {
  const { topScores } = useCurrentSimon();
  const [scores, setScores] = useState();

  // console.log("HighScoreRows, ", topScores);

  useEffect(() => {
    // console.log("HighScoreRows: ", topScores);
    if (topScores instanceof Promise) {
      topScores
        .then((res) => {
          setScores(res);
        })
        .catch((error) => {
          console.error("FAILED TO FETCH SCORES:", error);
        });
    }
  }, [topScores]);

  if (!topScores || topScores.length === 0)
    return <div>No Scores Available</div>;

  // return <></>;
  return (
    <>
      {topScores.map((score) => {
        <div key={score.id} className="scoreRow">
          <h2 className="topScoreName">{score.username}</h2>
          <p className="topScorePoints">{score.score}</p>
        </div>;
      })}
    </>
  );
};
