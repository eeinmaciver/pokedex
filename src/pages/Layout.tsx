import NavLinks from "../components/NavLink"
import { Outlet } from "react-router"
import ThemeToggle from "../components/ThemeToggle"
import { useTheme } from "../contexts/ThemeContext"
import LoginForm from "../LoginForm"
import useUserContext from "../contexts/UserContext"

export default function Layout () {
    const { theme } = useTheme()
    const { userState } = useUserContext()

    return (
        <div data-theme={theme}>
            <header>
                <h1>PokemonAPI</h1>
                {userState.status === "success" && <p>{userState.user.email}</p>}
                <ThemeToggle/>
                    <ul>
                        <li>
                            <NavLinks/>
                        </li>
                    </ul>
                <LoginForm/>
            </header>

            <main>
                <Outlet/>
            </main>
        </div>
    )

}