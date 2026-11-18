import { useState, useEffect } from "react";
import { type PokemonListItem } from "../types";
import { getPokemon, getPokemonList } from "../api/pokemon";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router"

export function usePokemonList() {
    const [pokeState, setPokeState] = useState<PokemonListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>();
    const [refetchCount, setRefetchCount] = useState(0);
    const [searchInput, setSearchInput] = useState<string | number>("");
    const [pokeSearch, setPokeSearch] = useState<string | number>("");
    const [errorMessage, setErrorMessage] = useState<boolean>(false);
    const [searchParams, setSearchParams] =  useSearchParams();

    const navigate = useNavigate();
    const pokeType = searchParams.get("type") ?? "";
    const pokeSort = searchParams.get("sort") ?? "Number";

    const refetch = () => {
        setRefetchCount((count) => count + 1);
    };

    const handleSearchChange = (value: string | number) => {
        setSearchInput(value);
        if (value === "") {
            setPokeSearch("");
        }
    };

    const handleTypeChange = (value: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (value === "") {
            newSearchParams.delete("type");
        } else {
            newSearchParams.set("type", value);
        }
        setSearchParams(newSearchParams);
    };

    const handleSortChange = (value: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        console.log(newSearchParams.toString())
        if (value === "number") {
            newSearchParams.delete("sort");
        } else {
            newSearchParams.set("sort", value);
        }
        setSearchParams(newSearchParams);
    }

    
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
                if (pokeSort === "name") {
                    data.sort((a, b) => {
                        if (a.name < b.name) {
                            return -1;
                            }
                        if (a.name > b.name) {
                            return 1;
                            }
                            return 0;
                        }
                    )}
                setPokeState(data);
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
    }, [pokeType, pokeSearch, pokeSort,  refetchCount])

    return { pokeState, isLoading, error, pokeType, pokeSort, handleSortChange, handleTypeChange, searchInput, setSearchInput, pokeSearch, setPokeSearch, handleSearchChange, refetch, errorMessage };

}
  
  
