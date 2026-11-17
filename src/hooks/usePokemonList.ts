import { useState, useEffect } from "react";
import { type PokemonListItem } from "../types";
import { getPokemonList } from "../api/pokemon";

export function usePokemonList() {
    const [pokeState, setPokeState] = useState<PokemonListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>();
    const [pokeType, setPokeType] = useState<string>("")
    const [refetchCount, setRefetchCount] = useState(0);
    const refetch = () => {
        setRefetchCount((count) => count + 1);
    };
    
    useEffect(() => {
        const fetchPokemon = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getPokemonList({type: pokeType});
                setPokeState(data);
                }
            catch (err) {
                console.error("the error!", err)
                setError(err instanceof Error ? err.message : "Something went wrong") 
            } finally {
                setIsLoading(false);
            }
        }
        fetchPokemon()
    }, [pokeType, refetchCount])

    return { pokeState, isLoading, error, pokeType, setPokeType, refetch };

}
  
  
