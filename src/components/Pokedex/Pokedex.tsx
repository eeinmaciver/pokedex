import { usePokemonList } from "../../hooks/usePokemonList"
import PokemonGrid from "../PokemonGrid/PokemonGrid"
import TypeSelect from "../TypeSelect"

export default function Pokedex() {

    const  { pokeState, isLoading, error, pokeType, setPokeType, refetch } = usePokemonList()
    
    if( isLoading) return <p>Loading Pokemon...</p>
    if (error) return (<div>
                        <p role="alert">{error}</p>
                        <button className="btn" onClick={() => refetch()}>Retry</button>
                        </div>)
    if (pokeState.length === 0) return <p>No Pokemon...</p>

    return (
        <>
            <TypeSelect type={pokeType} onChange={setPokeType} />
            <PokemonGrid pokemon={pokeState} />
        </>
    )

};