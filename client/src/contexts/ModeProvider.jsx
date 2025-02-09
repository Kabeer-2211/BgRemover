import { useState, createContext } from 'react';

export const ModeContext = createContext(false);

const ModeProvider = ({ children }) => {
    let darkMode = localStorage.getItem('darkMode') === 'true';
    const [isDark, setIsDark] = useState(darkMode);
    const changeMode = () => {
        setIsDark(!isDark);
        localStorage.setItem('darkMode', !isDark);
    }

    return (
        <ModeContext.Provider
            value={{
                isDark,
                changeMode,
            }}
        >
            {children}
        </ModeContext.Provider>
    )
}

export default ModeProvider