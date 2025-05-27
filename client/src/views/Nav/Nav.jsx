import "./Nav.css";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav className="navbar" id="navbar">
      <ul className="navList" id="navList">
        <li className="navElement">
          <Link className="linkTo" to="/">
            Home
          </Link>
        </li>
        <li className="navElement">
          <Link className="linkTo" to="/simon">
            Simon
          </Link>
        </li>
        <li className="navElement">
          <Link className="linkTo" to="/top-scores">
            Top-Scores
          </Link>
        </li>
      </ul>
    </nav>
  );
};
