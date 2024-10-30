import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
    const location = useLocation();

    // Specify the routes where the header should be hidden
    const hideHeaderRoutes = [""]; 

    // Check if the current path is one of the hideHeaderRoutes
    const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);
    return(
        <div className="py-6 px-20 flex flex-col min-h-screen">
            {!shouldHideHeader && <Header />}
            <Outlet />
        </div>
    );
}