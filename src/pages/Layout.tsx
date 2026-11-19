import NavLinks from "../components/NavLink"
import { Outlet } from "react-router"
import ThemeToggle from "../components/ThemeToggle"
import { useTheme } from "../contexts/ThemeContext"


export default function Layout () {
    const { theme } = useTheme()
    
    return (
        <div data-theme={theme}>
            <header>
                <h1>PokemonAPI</h1>
                <ThemeToggle/>
                    <ul>
                        <li>
                            <NavLinks/>
                        </li>
                    </ul>
            </header>

            <main>
                <Outlet/>
            </main>
        </div>
    )

}