import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { isAuthenticated, setRedirectPath } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        setRedirectPath(location.pathname);
        return <Navigate to="/login" replace />;
    }
    return children;
}