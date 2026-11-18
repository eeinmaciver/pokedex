import { useState, useEffect } from "react";
import { getPokemon } from "../api/pokemon";
import { type PokemonFetch } from "../api/pokemon";

export function usePokemon(nameOrID: string | number) {
    const [pokemon, setPokemon] = useState<PokemonFetch[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>();
    const [refetchCount, setRefetchCount] = useState(0);
    // const [searchInput, setSearchInput] = useState<string | number>("");
    // const [pokeSearch, setPokeSearch] = useState<string | number>("");

    const refetch = () => {
        setRefetchCount((count) => count + 1);
    };

    // const handleSearchChange = (value: string | number) => {
    //     setSearchInput(value);
    //     if (value === "") {
    //         setPokeSearch("");
    //     }
    // };
    
    useEffect(() => {
        const fetchPokemon = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getPokemon(nameOrID)
                setPokemon(data);
                }
            catch (err) {
                console.error("the error!", err)
                setError(err instanceof Error ? err.message : "Something went wrong") 
            } finally {
                setIsLoading(false);
            }
        }
        fetchPokemon()
    }, [nameOrID, refetchCount])

    return { pokemon, isLoading, error, refetch };

}
  