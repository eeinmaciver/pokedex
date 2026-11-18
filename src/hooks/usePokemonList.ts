import { useState, useEffect } from "react";
import { type PokemonListItem } from "../types";
import { getPokemon, getPokemonList } from "../api/pokemon";
import { type PokemonFetch } from "../api/pokemon";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router"

export function usePokemonList() {
    const [pokeState, setPokeState] = useState<PokemonListItem[]>([]);
    const [pokemon, setPokemon] = useState<PokemonFetch[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>();
    const [pokeType, setPokeType] = useState<string>("")
    const [refetchCount, setRefetchCount] = useState(0);
    const [searchInput, setSearchInput] = useState<string | number>("");
    const [pokeSearch, setPokeSearch] = useState<string | number>("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<true | false>(false);

    const [searchParams, setSearchParams] =  useSearchParams();
    const type = searchParams.get("type") ?? "all types";

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
                    try {
                        const pokeData = await getPokemon(pokeSearch)
                        const pokeId = pokeData[0].id
                        navigate(`/pokedex/${pokeId}`)
                    } catch (err) {
                        setErrorMessage(true)
                    }
                } else {
                const data = await getPokemonList({type: pokeType});
                setPokeState(data);
                setSearchParams({"type": pokeType})
            }
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

    return { pokeState, isLoading, error, pokeType, setPokeType, searchInput, setSearchInput, pokeSearch, setPokeSearch, handleSearchChange, refetch, errorMessage };

}
  
  
