// App.jsx
import "./App.css";
import {
  createBrowserRouter,
  // createRoutesFromElements,
  // Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Authenticate } from "./views/Users/Authenticate";
import { Main } from "./views/Main/Main";
import { SignUp } from "./views/Users/SignUp";
import { PrivateRoutes } from "./components/PrivateRoutes/PrivateRoutes";
import { Hidden } from "./views/Hidden/Hidden";
import { Simon } from "./views/Simon/Simon";
import { HighScores } from "./views/HighScores/HighScores";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/main" /> },
      { path: "signin", element: <Authenticate /> },
      { path: "signup", element: <SignUp /> },
      { path: "main", element: <Main /> },
      { path: "high_scores", element: <HighScores /> },
      {
        element: <PrivateRoutes />,
        children: [
          { path: "hidden", element: <Hidden /> },
          { path: "simon", element: <Simon /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
