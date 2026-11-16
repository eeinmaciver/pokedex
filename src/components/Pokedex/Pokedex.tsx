import PokemonGrid from "../PokemonGrid/PokemonGrid"
import { useState, useEffect } from "react";
import { type PokemonListItem } from "../../types";

interface PokemonAPIResponse {
    count: number;
    next: string | null;
    previous: string | null;
    items: PokemonListItem[]
}

export default function Pokedex() {

    const [pokeState, setPokeState] = useState<PokemonListItem[]>([])

useEffect(() => {
    const fetchPokemon = async () => {

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/pokemon?limit=20`);
            if (!res.ok) {
                throw new Error(`Could not load Pokémon (${res.status})`);
            }
            const data: PokemonAPIResponse = await res.json()
            setPokeState(data.items)
            }
        catch (err) {
            throw new Error("Something went wrong") 
        }
    }
    fetchPokemon()
}, [])


    return (
        <PokemonGrid pokemon={pokeState} />
    )

};