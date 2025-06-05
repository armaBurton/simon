// Main.jsx
import "./Main.css";
import { Simon } from "../Simon/Simon";
import { useCurrentSimon } from "../../context/SimonProvider";
// import { Navigate, useLocation } from "react-router";

export const Main = () => {
  const simon = useCurrentSimon();
  // const location = useLocation();

  if (!simon) return <div className="mainSection">Loading...</div>;

  // simon.status = 200;

  return (
    <section className="mainSection">
      {/* <Simon /> */}
      {simon?.status === 401 ? (
        simon.message
      ) : (
        <Simon simon={simon} />
        // <Simon simon={simon} currentSelected={location.state?.from} />
      )}
    </section>
  );
};
