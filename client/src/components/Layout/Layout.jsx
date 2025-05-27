import "./Layout.css";
import { Header } from "./Header/Header";
import { SimonStatus } from "./SimonStatus/SimonStatus";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <section>
        <Header>
          <SimonStatus />
        </Header>
      </section>
      <section>
        <Outlet />
      </section>
    </>
  );
};
