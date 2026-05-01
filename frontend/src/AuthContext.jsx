import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "./config/api";

const AuthContext = createContext();


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state


    const fetchUser = async () => {
        try {
            console.log("Fetching user")
            const res = await fetch(`${API_URL}/api/users/me`, {
                credentials: "include",
            });

            console.log("Fetch end")
            if (!res.ok) {
                setUser(null);
            } else {
                const data = await res.json();
                console.log("Fetched user:", data);
                setUser(data);
            }
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Run once when the app starts
    useEffect(() => {
        fetchUser();
    }, []);

    const login = async () => {
        await fetchUser();
    };

    const logout = async () => {
        // optional: tell backend to clear cookie
        await fetch("http://localhost:8080/api/logout", {
            method: "POST",
            credentials: "include",
        });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
