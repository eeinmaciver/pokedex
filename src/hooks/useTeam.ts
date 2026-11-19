import { useState, useEffect } from "react";
import { addToTeam, getTeam, removeFromTeam } from "../api/team";
import { type TeamMember } from "../types";
import { getPokemon } from "../api/pokemon";
import { ApiError, TeamError } from "../api/client";



export default function useTeam(user_id: number) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>();
    const [refetchCount, setRefetchCount] = useState(0);
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [searchInput, setSearchInput] = useState<string | number>("");
    const [pokeSearch, setPokeSearch] = useState<string | number>("");
    const [errorMessage, setErrorMessage] = useState<boolean>(false);

    const [deleteInput, setDeleteInput] = useState<string | number>("");
    const [deleteSearch, setDeleteSearch] = useState<string | number>("");

    const refetch = () => {
        setRefetchCount((count) => count + 1);
    };

    const handleSearchChange = (value: string | number) => {
        setSearchInput(value);
        if (value === "") {
            setPokeSearch("");
        }
    };

    const handleDeleteSearchChange = (value: string | number) => {
        setDeleteInput(value);
        if (value === "") {
            setDeleteSearch("");
        }
    };


    useEffect(() => {
        const fetchPokemon = async () => {
            setIsLoading(true);
            setError(null);
            setPokeSearch("")
            setDeleteSearch("")
            try {
                const data = await getTeam(user_id)
                setTeam(data);
                if (pokeSearch) {
                    try {
                        const pokemon = await getPokemon(pokeSearch)
                        await addToTeam(user_id, {pokemon_id: pokemon[0].id, pokemon_name: pokemon[0].name})
                        
                        refetch()
                    } catch (err) {
                        console.error("the error!", err)
                        setError(err instanceof TeamError ? err.code :"Something Went Wrong") 
                }
                if (deleteSearch) {
                    try {
                        const pokemon = await getTeam(user_id)
                        console.log(pokemon)
                        const pokeMap = pokemon.map((p) => p.pokemon_name === deleteSearch ? p.id: null)
                        console.log(pokeMap)
                        if (pokeMap.every((item) => item === null)) {
                            throw new ApiError("Team member not found", 404)
                        }
                        const id = pokeMap.find((item) => item !== null)
                        console.log(id)
                        await removeFromTeam(user_id, id!)
                        refetch()
                    } catch (err) {
                        console.error("the error!", err)
                        setError(err instanceof TeamError ? err.code :"Something Went Wrong")                         
                    }
                }
            }}
            catch (err) {
                console.error("the error!", err)
                setError(err instanceof Error ? err.message : "SOMETHING WENT WRONG") 
            } finally {
                setIsLoading(false);
            }
        }
        fetchPokemon()
    }, [user_id, pokeSearch, refetchCount, deleteSearch])


    return { team, isLoading, error, refetch, handleSearchChange, pokeSearch, searchInput, setSearchInput, setPokeSearch, errorMessage, handleDeleteSearchChange, deleteInput, setDeleteSearch };

}