import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectLoginPending } from "../../features/AdminLogin/adminLoginSlice";

const ProtectedRoute = () => {
    const token = localStorage.getItem('token');

    const loginPending = useSelector(selectLoginPending);

    if (loginPending) {
        return null;
    }

    return token ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoute;