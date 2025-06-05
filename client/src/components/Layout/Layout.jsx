// Layout.jsx
import "./Layout.css";
import { Header } from "./Header/Header";
import { SimonStatus } from "./SimonStatus/SimonStatus";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <section className="layoutSection">
        <Header>
          <SimonStatus />
        </Header>
      </section>
      <section className="layoutSection">
        <Outlet />
      </section>
    </>
  );
};
