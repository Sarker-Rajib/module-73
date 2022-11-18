import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";

const AdminRoute = ({ children }) => {
    const { currentUser, loading } = useContext(AuthContext);
    const [isAdmin, adminLoading] = useAdmin(currentUser?.email);
    const location = useLocation();

    if (loading || adminLoading) {
        return <div>Loading</div>
    }

    if (currentUser && isAdmin) {
        return children;
    }
    // console.log(isAdmin);

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;