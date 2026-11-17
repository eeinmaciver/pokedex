import { useState, useEffect } from "react";
import { type PokemonListItem } from "../types";
import { getPokemon, getPokemonList } from "../api/pokemon";

export function usePokemonList() {
    const [pokeState, setPokeState] = useState<PokemonListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>();
    const [pokeType, setPokeType] = useState<string>("")
    const [refetchCount, setRefetchCount] = useState(0);
    const [searchInput, setSearchInput] = useState<string | number>("");
    const [pokeSearch, setPokeSearch] = useState<string | number>("");

    const refetch = () => {
        setRefetchCount((count) => count + 1);
    };

    const handleSearchChange = (value: string | number) => {
        setSearchInput(value);
        if (value === "") {
            setPokeSearch("");
        }
    };
    
    useEffect(() => {
        const fetchPokemon = async () => {
            setIsLoading(true);
            setError(null);
            try {
                if (pokeSearch) {
                    const data = await getPokemon(pokeSearch)
                    setPokeState([data]);
                } else {
                const data = await getPokemonList({type: pokeType});
                setPokeState(data);}
                }
            catch (err) {
                console.error("the error!", err)
                setError(err instanceof Error ? err.message : "Something went wrong") 
            } finally {
                setIsLoading(false);
            }
        }
        fetchPokemon()
    }, [pokeType, pokeSearch, refetchCount])

    return { pokeState, isLoading, error, pokeType, setPokeType, searchInput, setSearchInput, pokeSearch, setPokeSearch, handleSearchChange, refetch };

}
  
  
