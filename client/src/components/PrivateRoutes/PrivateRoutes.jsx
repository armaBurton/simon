// PrivateRoutes.jsx
import { Navigate, Outlet } from "react-router";
import { useCurrentSimon } from "../../context/SimonProvider";

export const PrivateRoutes = () => {
  const simon = useCurrentSimon();

  return simon?.email ? <Outlet /> : <Navigate to="/main" />;
};
