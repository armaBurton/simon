import { Outlet } from "react-router-dom";

export const Layout = () => {
    return <>
        <section>
            <Outlet />
        </section>
    </>;
}