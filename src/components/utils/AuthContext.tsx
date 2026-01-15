import { createContext, useContext, useState } from "react";
const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [redirectPath, setRedirectPath] = useState<string | null>(null);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, redirectPath, setRedirectPath }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}