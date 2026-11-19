import { useTheme } from "../contexts/ThemeContext"

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button type="button" onClick={toggleTheme}>{theme}</button>
    )
}