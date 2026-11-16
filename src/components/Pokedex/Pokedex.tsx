import PokemonGrid from "../PokemonGrid/PokemonGrid"
import { useState, useEffect } from "react";
import { type PokemonListItem } from "../../types";

interface PokemonAPIResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[]
}

export default function Pokedex() {

    const [pokeState, setPokeState] = useState<PokemonListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>();

useEffect(() => {
    const fetchPokemon = async () => {
        setIsLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/pokemon?limit=20`);
            if (!res.ok) {
                throw new Error(`Could not load Pokémon (${res.status})`);
            }
            const data: PokemonAPIResponse = await res.json()
            setPokeState(data.results)
            }
        catch (err) {
            console.error("the error!", err)
            setError(err instanceof Error ? err.message : "Something went wrong") 
        } finally {
            setIsLoading(false);
        }
    }
    fetchPokemon()
}, [])

    if(isLoading) return <p>Loading Pokemon...</p>
    if(error) return <p role="alert">{error}</p>
    if(pokeState.length === 0) return <p>No Pokemon...</p>


    return (
        <PokemonGrid pokemon={pokeState} />
    )

};