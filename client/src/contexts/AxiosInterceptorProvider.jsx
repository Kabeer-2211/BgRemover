import { useEffect, createContext } from "react";
import axios from "../utils/axios";
import { getToken } from "../utils/User";
import useError from "../hooks/useError";

export const axiosInterceptorContext = createContext();

const AxiosInterceptorProvider = ({ children }) => {
    const { showError } = useError();
    function useInterceptor() {
        useEffect(() => {
            const requestIntercepter = axios.interceptors.request.use(
                (config) => {
                    const token = getToken();
                    if (token) {
                        config.headers.Authorization = `bearer ${token}`;
                    }
                    return config;
                },
                (error) => {
                    return Promise.reject(error);
                }
            )

            const responseInterceptor = axios.interceptors.response.use(
                (response) => {
                    return response.data;
                },
                (error) => {
                    const { response } = error;
                    let parsedError = '';
                    if (response && response.data) {
                        parsedError = response.data.message || "Something Went Wrong!";
                    } else {
                        parsedError = "Something Went Wrong!";
                    }
                    showError(parsedError);
                    return Promise.reject(response);
                }
            )
            return () => {
                axios.interceptors.request.eject(requestIntercepter);
                axios.interceptors.response.eject(responseInterceptor);
            };
        }, []);
    }
    return (
        <axiosInterceptorContext.Provider value={{
            useInterceptor
        }}>
            {children}
        </axiosInterceptorContext.Provider>
    )
};

export default AxiosInterceptorProvider