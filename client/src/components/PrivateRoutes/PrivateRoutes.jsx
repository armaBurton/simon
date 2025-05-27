// PrivateRoutes.jsx
import { Navigate, Outlet } from "react-router";
import { useSimon } from "../../context/SimonProvider";

export const PrivateRoutes = () => {
  const simon = useSimon();

  return simon.email ? <Outlet /> : <Navigate to="/main" />;
};
