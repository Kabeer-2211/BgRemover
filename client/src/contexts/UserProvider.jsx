import { createContext, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { login, register, getProfile, verifymail, forgotPassword as forgotPasswordService, resetPassword as resetPasswordService } from '@services/User';
import useAxiosInterceptor from '@hooks/useAxiosInterceptor';
import { setUser, beginAuthentication, authenticationSuccess, authenticationFailure, finishLoading, logout as logoutState } from '@redux/slices/authSlice';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const { useInterceptor } = useAxiosInterceptor();
    useInterceptor();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    useEffect(() => {
        if (!token) {
            dispatch(logoutState());
        }
    }, [navigate, pathname, token]);
    useEffect(() => {
        async function getUserdata() {
            try {
                const response = await getProfile();
                if (response && response.success) {
                    dispatch(setUser(response.user));
                }
            } catch (err) {
                logout();
                console.log(err);
            } finally {
                setTimeout(() => {
                    dispatch(finishLoading());
                }, 500);
            }
        }
        if (token) {
            getUserdata();
        }
    }, []);

    const signupUser = async (data) => {
        try {
            const response = await register(data);
            if (response) {
                return true;
            }
        } catch (err) {
            console.log(err);
        } finally {
            setTimeout(() => {
                dispatch(finishLoading());
            }, 500);
        }
    };
    const loginUser = async (data) => {
        try {
            dispatch(beginAuthentication());
            const response = await login(data);
            if (!response.isVerified && response.isVerified == false) {
                return false;
            } else if (!response.isVerified) {
                return true;
            } else {
                dispatch(authenticationSuccess({ token: response.token, user: response.user }));
            }
        } catch (err) {
            dispatch(authenticationFailure());
            console.log(err);
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
                dispatch(finishLoading());
            }, 500);
        }
    }
    const resetPassword = async (data) => {
        try {
            const response = await resetPasswordService(data);
            if (response && response.success) {
                logout();
                window.location.href = '/login';
            }
        } catch (err) {
            console.log(err);
        } finally {
            setTimeout(() => {
                dispatch(finishLoading());
            }, 500);
        }
    }
    const logout = () => {
        try {
            dispatch(logoutState());
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <UserContext.Provider value={{
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