import { usePokemonList } from "../../hooks/usePokemonList"
import PokemonGrid from "../PokemonGrid/PokemonGrid"

export default function Pokedex() {

    const  { pokeState, isLoading, error } = usePokemonList()
    
    if(isLoading) return <p>Loading Pokemon...</p>
    if(error) return <p role="alert">{error}</p>
    if(pokeState.length === 0) return <p>No Pokemon...</p>


    return (
        <PokemonGrid pokemon={pokeState} />
    )

};