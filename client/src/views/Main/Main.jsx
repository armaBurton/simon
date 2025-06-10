// Main.jsx
import "./Main.css";
import { Simon } from "../Simon/Simon";
import { useCurrentSimon } from "../../context/SimonProvider";
import { Navigate } from "react-router";

export const Main = () => {
  const { user } = useCurrentSimon();

  if (!user) return <Navigate to="/signin" />;

  return (
    <section className="mainSection">
      <Simon />
    </section>
  );
};
