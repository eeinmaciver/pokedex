import NavLinks from "../components/NavLink"
import { Outlet } from "react-router"
import ThemeToggle from "../components/ThemeToggle"
import { useTheme } from "../contexts/ThemeContext"
import LoginForm from "../LoginForm"
import useUserContext from "../contexts/UserContext"
import LogOut from "../components/LogOut"

export default function Layout () {
    const { theme } = useTheme()
    const { userState } = useUserContext()

    return (
        <div data-theme={theme}>
            <header>
                <h1>PokemonAPI</h1>
                {userState.status === "success" && <p>{userState.user.email}</p>}
                {userState.status === "error" && <p>{userState.message}</p>}
                {userState.status === "anonymous" && <p>Not Logged In</p>}
                <ThemeToggle/>
                    <ul>
                        <li>
                            <NavLinks/>
                        </li>
                    </ul>
                {userState.status !== "success" && <LoginForm/>}
                {userState.status === "success" && <LogOut/>}
            </header>

            <main>
                <Outlet/>
            </main>
        </div>
    )

}