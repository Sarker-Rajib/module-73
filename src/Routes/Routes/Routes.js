import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "../../Layout/DashBoardLayout";
import Main from "../../Layout/Main";
import Appoinment from "../../Pages/Appoinment/AppoinmentSec/Appoinment";
import AllUsers from "../../Pages/Dashboard/AllUsers";
import MyAppoinment from "../../Pages/Dashboard/MyAppoinment";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import PrivateRoute from "../PrivateRoutes/PrivateRoute";
import AdminRoute from "./AdminRoute/AdminRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <></>
            },
            {
                path: '/appointment',
                element: <Appoinment></Appoinment>
            },
            {
                path: '/about',
                element: <></>
            },
            {
                path: '/reviews',
                element: <></>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Register></Register>
            }
        ]
    },
    {
        path: '/dashboard',
        element:
            <PrivateRoute>
                <DashBoardLayout></DashBoardLayout>
            </PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <MyAppoinment></MyAppoinment>
            },
            {
                path: '/dashboard/users',
                element:
                    <AdminRoute>
                        <AllUsers></AllUsers>
                    </AdminRoute>
            }
        ]
    }
])

export default router;