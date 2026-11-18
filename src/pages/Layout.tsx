import NavLinks from "../components/NavLink"
import { Outlet } from "react-router"


export default function Layout () {

    return (
        <div>
            <header>
                <h1>PokemonAPI</h1>
                <nav>
                    <ul>
                        <li>
                            <NavLinks/>
                        </li>
                    </ul>
                </nav>
            </header>

            <main>
                <Outlet/>
            </main>
        </div>
    )

}