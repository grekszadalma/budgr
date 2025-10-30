// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        // Not logged in → redirect to login
        return <Navigate to="/login" replace />;
    }

    // Logged in → show the page
    return children;
};

export default ProtectedRoute;
