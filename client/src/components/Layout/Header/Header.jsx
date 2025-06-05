import "./Header.css";
import { Link } from "react-router-dom";

export const Header = ({ children }) => {
  return (
    <header>
      <Link to="/main" className="headerLink">
        all_together_now
      </Link>
      {children}
    </header>
  );
};
