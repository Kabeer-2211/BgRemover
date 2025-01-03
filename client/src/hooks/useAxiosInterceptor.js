import { useContext } from "react";
import { axiosInterceptorContext } from "../contexts/AxiosInterceptorProvider";

function useAxiosInterceptor() {
    return useContext(axiosInterceptorContext);
}

export default useAxiosInterceptor