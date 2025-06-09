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
      const user = await getCurrentUser();
      setUser(user);
    };
    checkUser();
    if (user) console.log(user);
    // setUser(user);
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("Logout Clicked");

    // (await signOut()) ? setUser(null) : console.error("Failure to logout.");
    if (await signOut()) {
      setUser(null);
      //   if (window.cookieStore) {}
      // }
    }
  };

  return (
    <div className="auth-div">
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
            <Link className="nav-style">hello_{user?.email}</Link>
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
