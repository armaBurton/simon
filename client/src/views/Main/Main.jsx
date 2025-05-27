// Main.jsx
import "./Main.css";
import Simon from "../../components/Simon/Simon";
import { useSimon } from "../../context/SimonProvider";
// import { Navigate, useLocation } from "react-router";

const Main = () => {
  const simon = useSimon();
  // const location = useLocation();

  simon.status = 200;

  return (
    <section className="mainSection">
      <Simon />
      {/* {simon.status === 401 ? simon.message : <Simon />} */}
    </section>
  );
};

export default Main;
