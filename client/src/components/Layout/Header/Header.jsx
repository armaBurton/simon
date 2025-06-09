import "./Header.css";
import "./../SimonStatus/SimonStatus.css";
import { Link } from "react-router-dom";
import simonBlack from "../../../assets/simon_black.png";
import simonWhite from "../../../assets/simon_white.png";
import simonColor from "../../../assets/simon_color.png";
import { useState } from "react";

export const Header = ({ children }) => {
  const [src, setSrc] = useState(simonBlack);

  return (
    <header>
      <Link to="/main" className="headerLink ">
        <img
          src={src}
          onMouseEnter={() => setSrc(simonWhite)}
          onMouseLeave={() => setSrc(simonBlack)}
          onMouseDown={() => setSrc(simonColor)}
          onMouseUp={() => setSrc(simonWhite)}
          alt="Simon Logo"
          className="simon-style"
        />
      </Link>
      {children}
    </header>
  );
};
