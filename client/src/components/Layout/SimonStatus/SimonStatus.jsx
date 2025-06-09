// SimonStatus.jsx
import "./SimonStatus.css";
import { Link } from "react-router-dom";
import { useCurrentSimon } from "../../../context/SimonProvider";
import { getCurrentUser, signOut } from "../../../services/simon";
import { useEffect, useState } from "react";

export const SimonStatus = () => {
  const { user, setUser } = useCurrentSimon();

  // const [user, setUser] = useState(user);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) setUser(currentUser);
    };
    checkUser();
  }, []);

  useEffect(() => {
    console.log("USER: ", user.user);
  }, [user]);

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("Logout Clicked");

    if (await signOut()) {
      setUser(null);
    }
  };

  return (
    <div className="auth-div">
      <Link to="#" className="nav-style">
        high_scores
      </Link>
      {!user ? (
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
            <Link className="nav-style">hello_{user.user.email}</Link>
          </p>
          <p>
            <Link to="/signout" className="nav-style" onClick={handleLogout}>
              sign_out
            </Link>
          </p>
        </>
      )}
    </div>
  );
};
