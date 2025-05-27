import "./Header.css";
import { Link } from "react-router-dom";

export const Header = ({ children }) => {
  return (
    <Header>
      <Link to="/main" className="headerLink">
        all_together_now
      </Link>
      {children}
    </Header>
  );
};
