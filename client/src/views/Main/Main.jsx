// Main.jsx
import "./Main.css";
import Simon from "../../components/Simon/Simon";
import { useSimon } from "../../context/SimonProvider";
// import { Navigate, useLocation } from "react-router";

export const Main = () => {
  const simon = useSimon();
  // const location = useLocation();

  return (
    <section className="mainSection">
      {simon.status === 401 ? simon.message : <Simon />}
    </section>
  );
};
