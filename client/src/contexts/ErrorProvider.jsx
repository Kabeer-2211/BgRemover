import { createContext, useState, useEffect } from "react";

export const ErrorContext = createContext();

const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(false);
    const showError = (show) => {
        setError(show);
    }
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [error])

    return (
        <ErrorContext.Provider value={{ error, showError }}>
            {children}
        </ErrorContext.Provider>
    )
}

export default ErrorProvider