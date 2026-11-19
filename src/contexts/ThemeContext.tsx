import { createContext, useContext } from "react";
import { useState } from "react";
import { type ReactNode } from "react";
import { useMemo } from "react";

type Theme = "light" | "dark";


interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme() {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");

    const value = useMemo(
        () => ({
            theme,
            toggleTheme: () =>
                setTheme((curr) => (curr === "light" ? "dark" : "light")),
        }),
    [theme]
    );
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    )
}