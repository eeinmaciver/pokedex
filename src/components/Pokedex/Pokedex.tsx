import PokemonGrid from "../PokemonGrid/PokemonGrid"
import { useState, useEffect } from "react";
import { type PokemonListItem } from "../../types";



export default function Pokedex() {

    const [pokeState, setPokeState] = useState<PokemonListItem[]>([])

useEffect(() => {
    const fetchPokemon = async () => {
    fetch(`${import.meta.env.VITE_API_URL}/pokemon?limit=20`)
    .then((res) => res.json())
    .then((data) => setPokeState(data.results));
    }
    fetchPokemon()
}, [])


    return (
        <PokemonGrid pokemon={pokeState} />
    )

};