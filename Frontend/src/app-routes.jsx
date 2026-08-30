import { createBrowserRouter } from "react-router";
import Register from "./feature/auth/pages/Register";
import Login from "./feature/auth/pages/Login";
import Protected from "./feature/auth/components/Protected";
import CustomerDashboard from "./feature/tickets/pages/CustomerDashboard";
import CreateTicket from "./feature/tickets/pages/CreateTicket";
import AgentDashboard from "./feature/tickets/pages/AgentDashboard";
import TicketDetails from "./feature/tickets/pages/TicketDetails";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: <Protected> <CustomerDashboard /> </Protected>
    },
    {
        path: "/create-ticket",
        element: (
            <Protected>
                <CreateTicket />
            </Protected>
        )
    },
    {
    path: "/agent",
    element: (
        <Protected>
            <AgentDashboard />
        </Protected>
    )
},
{
    path: "/tickets/:id",
    element: (
        <Protected>
            <TicketDetails />
        </Protected>
    )
}
])