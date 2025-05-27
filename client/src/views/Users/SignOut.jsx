// SignOut.jsx
import { useAuth, useSimon } from "../../context/SimonProvider";
import { useNavigate } from "react-router-dom";

export const SignOut = async () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const simon = useSimon();
  const setUserNull = useSimon();

  const handleLogout = async () => {
    try {
      await logout()
        .then(() => setUserNull())
        .finally(() => navigate("/game", { replace: true }));
    } catch (err) {
      console.error(err);
    }
  };

  simon?.email && handleLogout();

  return <></>;
};
