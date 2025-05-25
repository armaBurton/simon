import { Link } from "react-router-dom";
import "./Nav.css";

export const Nav = () => {
  return (
    <nav className="navbar" id="navbar">
      <ul className="navList" id="navList">
        <li className="navElement">
          <Link to="/">Home</Link>
        </li>
        <li className="navElement">
          <Link to="/simon">Simon</Link>
        </li>
        <li className="navElement">
          <Link to="/top-scores">Top-Scores</Link>
        </li>
      </ul>
    </nav>
  );
};
