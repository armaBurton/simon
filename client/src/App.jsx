// App.jsx
import "./App.css";
import {
  createBrowserRouter,
  // createRoutesFromElements,
  // Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { Authenticate } from "./views/Users/Authenticate";
import Main from "./views/Main/Main";
import { SignUp } from "./views/Users/SignUp";
import { PrivateRoutes } from "./components/PrivateRoutes/PrivateRoutes";
import { Hidden } from "./views/Hidden/Hidden";
import Simon from "./components/Simon/Simon";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/main" /> },
      { path: "main", element: <Main /> },
      { path: "signin", element: <Authenticate /> },
      { path: "signup", element: <SignUp /> },
      {
        element: <PrivateRoutes />,
        children: [
          { path: "Hidden", element: <Hidden /> },
          { path: "Simon", element: <Simon /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

// const App = () => {
//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path="/" element={<Layout />}>
//         <Route index element={<Navigate to="/main" />} />
//         <Route path="/main" element={<Main />} />
//         <Route path="/signin" element={<Authenticate />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route element={<PrivateRoutes />}>
//           <Route path="/Hidden" element={<Hidden />} />
//           <Route path="/Simon" element={<Simon />} />
//         </Route>
//       </Route>
//     )
//   );

//   return <RouterProvider router={router} />;
// };
