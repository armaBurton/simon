// SignOut.jsx
import { useAuth, useCurrentSimon } from "../../context/SimonProvider";
import { useNavigate } from "react-router-dom";

export const SignOut = async () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const simon = useCurrentSimon();
  const setUserNull = useCurrentSimon();

  const handleLogout = async () => {
    try {
      await logout()
        .then(() => setUserNull())
        .finally(() => navigate("/signin", { replace: true }));
    } catch (err) {
      console.error(err);
    }
  };

  simon?.email && handleLogout();

  return <></>;
};
