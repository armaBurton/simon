// SimonStatus.jsx
import "./SimonStatus.css";
import { Link } from "react-router-dom";
import { useSimon } from "../../../context/SimonProvider";
import { signOut } from "../../../services/simon";
import { useEffect, useState } from "react";

export const SimonStatus = () => {
  const simonUser = useSimon();

  const [thisSimonUser, setThisSimonUser] = useState(simonUser);

  useEffect(() => {
    setThisSimonUser(user);
  }, [simonUser]);

  const handleLogout = async (e) => {
    e.preventDefault();
    await signOut();
    setThisSimonUser(null);
    window.location.reload();
  };

  return (
    <div className="auth-div">
      {!thisSimonUser?.email ? (
        <>
          <p>
            <Link to="/signup" className="nav-style">
              sign_up
            </Link>
          </p>
          <p>
            <Link to="/signin" className="nav-style">
              sign_in
            </Link>
          </p>
        </>
      ) : (
        <>
          <p>
            <Link className="nav-style">hello_{thisSimonUser?.email}</Link>
          </p>
          <p>
            <Link to="/signout" className="nav-style">
              sign_out
            </Link>
          </p>
        </>
      )}
    </div>
  );
};
