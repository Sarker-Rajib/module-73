import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "../../Layout/DashBoardLayout";
import Main from "../../Layout/Main";
import Appoinment from "../../Pages/Appoinment/AppoinmentSec/Appoinment";
import AddDoctor from "../../Pages/Dashboard/AddDoctor";
import AllUsers from "../../Pages/Dashboard/AllUsers";
import ManageDoctors from "../../Pages/Dashboard/ManageDoctors";
import MyAppoinment from "../../Pages/Dashboard/MyAppoinment";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Payment from "../../Pages/Payment/Payment";
import Register from "../../Pages/Register/Register";
import DisplayError from "../../Pages/Shared/Error/DisplayError/DisplayError";
import PrivateRoute from "../PrivateRoutes/PrivateRoute";
import AdminRoute from "./AdminRoute/AdminRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
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
        errorElement: <DisplayError></DisplayError>,
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
            },
            {
                path: '/dashboard/adddoctor',
                element:
                    <AdminRoute>
                        <AddDoctor></AddDoctor>
                    </AdminRoute>
            },
            {
                path: '/dashboard/managedoctors',
                element:
                    <AdminRoute>
                        <ManageDoctors></ManageDoctors>
                    </AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element:
                    <AdminRoute>
                        <Payment></Payment>
                    </AdminRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/bookings/${params.id}`)
            }
        ]
    }
])

export default router;