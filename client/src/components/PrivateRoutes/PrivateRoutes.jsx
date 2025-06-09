// PrivateRoutes.jsx
import { Navigate, Outlet } from "react-router";
import { useCurrentSimon } from "../../context/SimonProvider";

export const PrivateRoutes = () => {
  const { user } = useCurrentSimon();

  if (user === null || user === undefined) return <div>Loading...</div>;

  if (!user) return <Navigate to="/signin" replace />;
  if (user) return <Navigate to="/main" replace />;

  return <Outlet />;
};
