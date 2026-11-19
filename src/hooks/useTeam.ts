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
    const [addInput, setAddInput] = useState<string | number>("");
    const [addSearch, setAddSearch] = useState<string | number>("");
    const [addErrorMessage, setAddErrorMessage] = useState<string>("");

    const [delInput, setDelInput] = useState<string | number>("");
    const [delSearch, setDelSearch] = useState<string | number>("");
    const [delErrorMessage, setDelErrorMessage] = useState<string>("");

    const refetch = () => {
        setRefetchCount((count) => count + 1);
    };

    const handleAddInputChange = (value: string | number) => {
        setAddInput(value);
        setAddErrorMessage("");
        if (value === "") {
            setAddSearch("");
        }
    };

    const handleDelInputChange = (value: string | number) => {
        setDelInput(value);
        setDelErrorMessage("");
        if (value === "") {
            setDelSearch("");
        }
    };


    useEffect(() => {
        const fetchPokemon = async () => {
            setIsLoading(true);
            setError(null);
            setAddSearch("");
            setDelSearch("");

            try {
                console.time("getTeam");
                const pokemonTeam = await getTeam(user_id);
                console.timeEnd("getTeam");
                setTeam(pokemonTeam);
                if (addSearch) {
                    try {
                        console.time("add getPokemon");
                        const pokemon = await getPokemon(addSearch);
                        console.timeEnd("add getPokemon");
                        await addToTeam(user_id, {pokemon_id: pokemon[0].id, pokemon_name: pokemon[0].name})
                        refetch()
                    } catch (err) {
                        console.error("the error!", err)
                        setAddErrorMessage(err instanceof TeamError ? err.message : "Pokemon not found") 
                        }
                }
                if (delSearch) {
                    try {
                        console.time("delete getPokemon");
                        const pokemon = await getPokemon(delSearch);
                        console.timeEnd("delete getPokemon");
                        const teamMember = pokemonTeam.find((p) => 
                            p.pokemon_name === pokemon[0].name || p.pokemon_id === pokemon[0].id
                        );
                        if (!teamMember) {
                            setDelErrorMessage("This Pokémon is not on your team")
                        } else {
                            await removeFromTeam(user_id, teamMember.id)
                            refetch()
                        }

                    } catch (err) {
                        console.timeEnd("delete getPokemon")
                        console.error("the error!", err)
                        setDelErrorMessage(err instanceof TeamError ? err.message : "Pokémon not found")                         
                        }
                }
            }
            catch (err) {
                console.error("the error!", err)
                setError(err instanceof Error ? err.message : "SOMETHING WENT WRONG") 
            } finally {
                setIsLoading(false);
            }
        }
        fetchPokemon()
    }, [user_id, addSearch, refetchCount, delSearch])


    return { team, isLoading, error, refetch, addSearch, addInput, handleAddInputChange, setAddSearch, addErrorMessage, delErrorMessage, delInput, handleDelInputChange, setDelSearch };

}