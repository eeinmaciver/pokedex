import NavLinks from "../components/NavLink"
import { Outlet } from "react-router"


export default function Layout () {

    return (
        <div>
            <header>
                <h1>PokemonAPI</h1>
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