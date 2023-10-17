import { Outlet } from "react-router-dom";

export default Layout = () => {
    return <>
        <section>
            <Outlet />
        </section>
    </>;
}