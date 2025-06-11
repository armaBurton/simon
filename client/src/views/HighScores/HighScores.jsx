// HighScores.jsx
import "./HighScores.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getTopScores } from "../../services/topScores";
import { useCurrentSimon, user } from "../../context/SimonProvider";
import { Header } from "../../components/Layout/Header/Header";
import { SimonStatus } from "../../components/Layout/SimonStatus/SimonStatus";
import { HighScoreRows } from "./HighScoreRows/HighScoreRows";
// import { user } from "../../context/SimonProvider"

export const HighScores = () => {
  const { user, topScores, setTopScores } = useCurrentSimon();
  const navigate = useNavigate();

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

  const handleClick = (e) => {
    e.preventDefault();

    navigate("/simon", { replace: true });
  };

  return (
    <section className="topScoresSection">
      <Header>
        <SimonStatus />
      </Header>
      <div className="topScoresContainer">
        {/* <h1 className="scoresTitle">Top-Scores</h1> */}
        <h1 className="scoresTitle text3d">top_scores</h1>
        <HighScoreRows />
      </div>
      {!user ? (
        () => {}
      ) : (
        <button onClick={handleClick} className="backToSimon">
          simon
        </button>
      )}
    </section>
  );
};
