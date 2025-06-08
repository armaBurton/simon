// PrivateRoutes.jsx
import { Navigate, Outlet } from "react-router";
import { useCurrentSimon } from "../../context/SimonProvider";

export const PrivateRoutes = () => {
  const simon = useCurrentSimon();

  if (simon === null || simon === undefined) return <div>Loading...</div>;

  if (!simon?.email) return <Navigate to="/signin" replace />;

  return <Outlet />;
};

// export const PrivateRoutes = () => {
//   const simon = useCurrentSimon();

//   return simon?.email ? <Outlet /> : <Navigate to="/main" />;
// };
