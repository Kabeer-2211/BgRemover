import { createContext, useState, useEffect } from 'react';
import { login, register, getProfile, verifymail, forgotPassword as forgotPasswordService, resetPassword as resetPasswordService } from '../services/User';
import { getToken, setToken, deleteToken } from '../utils/User';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const { useInterceptor } = useAxiosInterceptor();
    useInterceptor();
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const token = getToken();
    const isAuthenticated = Boolean(token);
    useEffect(() => {
        if (!token) {
            deleteToken();
            setUser(undefined);
        }
    }, [navigate, pathname, token]);
    useEffect(() => {
        const token = getToken();
        async function getUserdata() {
            try {
                setIsLoading(true);
                const response = await getProfile();
                if (response && response.success) {
                    setUser(response.user);
                }
            } catch (err) {
                logout();
                console.log(err);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }
        }
        if (token) {
            getUserdata();
        }
    }, []);

    const signupUser = async (data) => {
        try {
            setIsLoading(true);
            const response = await register(data);
            if (response) {
                return true;
            }
        } catch (err) {
            console.log(err);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    };
    const loginUser = async (data) => {
        try {
            setIsLoading(true);
            const response = await login(data);
            console.log(response);
            if (!response.isVerified && response.isVerified == false) {
                return false;
            } else if (!response.isVerified) {
                return true;
            } else {
                setUser(response.user);
                setToken(response.token);
                window.location.href = '/';
            }
        } catch (err) {
            console.log(err);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    };
    const verifyEmail = async (info) => {
        const { data } = await verifymail(info);
        if (data && data.success) {
            return true;
        } else {
            return false;
        }
    }
    const forgotPassword = async (data) => {
        try {
            setIsLoading(true);
            const response = await forgotPasswordService(data);
            if (response && response.success) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    }
    const resetPassword = async (data) => {
        try {
            setIsLoading(true);
            const response = await resetPasswordService(data);
            if (response && response.success) {
                logout();
                window.location.href = '/login';
            }
        } catch (err) {
            console.log(err);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    }
    const logout = () => {
        try {
            setUser(undefined);
            deleteToken();
            window.location.href = '/login';
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <UserContext.Provider value={{
            isAuthenticated,
            user,
            isLoading,
            signupUser,
            loginUser,
            logout,
            verifyEmail,
            forgotPassword,
            resetPassword,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;