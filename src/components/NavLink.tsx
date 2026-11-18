import { Link, NavLink } from "react-router";



export default function NavLinks() {

    return (
        <>
            <NavLink to="/pokedex" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                <Link to="/pokedex">Pokedex</Link>
            </NavLink>
            <p>             </p>
            <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                <Link to="/">Home</Link>
            </NavLink>
        </>
    )
}

