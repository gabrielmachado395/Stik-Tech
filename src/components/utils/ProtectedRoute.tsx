import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { isAuthenticated, setRedirectPath, setIsAuthenticated } = useAuth();
    const location = useLocation();

    // Verifica se existe token no localStorage
    const token = localStorage.getItem("token");
    const isLogged = isAuthenticated || !!token;

    // Atualiza contexto se necessário
    if (!isAuthenticated && token) {
        setIsAuthenticated(true);
    }

    if (!isLogged) {
        setRedirectPath(location.pathname);
        return <Navigate to="/login" replace />;
    }
    return children;
}