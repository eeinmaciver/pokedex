import { useEffect } from "react";
import { useNavigate } from "react-router";


export default function Random() {

    const max = 150
    const randomPokemon = Math.floor(Math.random() * max + 1);
    const navigate = useNavigate()

    useEffect(() => {
        navigate(`/pokedex/${randomPokemon}`)
    }, []);

    return (
        <p>Loading random Pokemon...</p>
    )

}