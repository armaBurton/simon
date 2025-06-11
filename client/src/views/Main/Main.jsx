// Main.jsx
import "./Main.css";
import { Simon } from "../Simon/Simon";
import { useCurrentSimon } from "../../context/SimonProvider";
import { Navigate } from "react-router";
import { useEffect } from "react";
import { getTopScores } from "../../services/topScores";

export const Main = () => {
  const { user, topScores, setTopScores } = useCurrentSimon();

  if (!user) return <Navigate to="/signin" />;

  return (
    <section className="mainSection">
      <Simon />
    </section>
  );
};
