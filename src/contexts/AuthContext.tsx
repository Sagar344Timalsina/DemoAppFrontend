import React, { createContext, useState, useEffect } from "react";
import { getToken, removeToken } from "@/utils/token";
import * as authService from "@/services/authService";
interface User {
    id: number,
    userName: string,
    email: string,
    userRoles: [
        roelId: number,
        roleName: string
    ]
}

interface AuthContextType {
    user: any;
    loading: boolean;
    token: string | null;
    setToken: (token: string | null) => void;
    setUser: (User: any) => void;
    signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("AppToken"));
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true); // ✅ ensure we’re loading while checking token
            const token = getToken();
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const res = await authService.me();
                if (res.isSuccess && res.value) {
                    setUser(res.value);
                } else {
                    setUser(null);
                }
            } catch (err) {
                removeToken();
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);



    const signOut = () => {
        removeToken();
        setUser(null);
    };

    return <AuthContext.Provider value={{ token, setToken, signOut, user, setUser, loading }}>
        {children}
    </AuthContext.Provider>


}
