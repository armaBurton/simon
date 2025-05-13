import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Main } from "./views/Main/Main";
// import {Layout} from './components/Layout/Layout.jsx';
// import {Main} from './views/Main/Main.jsx';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/main" />} />
        <Route path="/main" element={<Main />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
