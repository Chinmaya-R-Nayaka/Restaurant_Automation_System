import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {
        try{
            const response = await api.get('/api/v1/auth/me');
            setUser(response.data.user);
            return response.data.user;
        }
        catch(error){
            setUser(null);
            return null;
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            await refreshUser();
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const logout = async () => {
        try{
            await api.post('/api/v1/auth/logout');
        }
        finally{
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            loading,
            refreshUser,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
