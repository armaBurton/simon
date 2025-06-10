// HighScores.jsx
import "./HighScores.css";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
import { getTopScores } from "../../services/topScores";
import { useCurrentSimon } from "../../context/SimonProvider";
import { Header } from "../../components/Layout/Header/Header";
import { SimonStatus } from "../../components/Layout/SimonStatus/SimonStatus";
import { HighScoreRows } from "./HighScoreRows/HighScoreRows";

export const HighScores = () => {
  const { topScores, setTopScores } = useCurrentSimon();

  useEffect(() => {
    const fetchHighScores = async () => {
      try {
        const res = await getTopScores();

        setTopScores(res);
        console.log("HighScore: ", topScores);
      } catch (error) {}
    };

    fetchHighScores();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="topScoresSection">
      <Header>
        <SimonStatus />
      </Header>
      <div className="topScoresContainer">
        <h1 className="scoresTitle">Top-Scores</h1>
        <HighScoreRows />
      </div>
    </section>
  );
};
