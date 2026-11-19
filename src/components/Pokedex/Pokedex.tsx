import { usePokemonList } from "../../hooks/usePokemonList"
import PokemonGrid from "../PokemonGrid/PokemonGrid"
import SearchBox from "../SearchBox/SearchBox"
import Sort from "../Sort"
import TypeSelect from "../TypeSelect"

export default function Pokedex() {

    const  { pokeState, isLoading, error, pokeType, pokeSort, handleSortChange, searchInput, handleTypeChange, setPokeSearch, refetch, setSearchInput, errorMessage} = usePokemonList()
    
    
    if( isLoading) return <p>Loading Pokemon...</p>
    if (error) return (<div>
                        <p role="alert">{error}</p>
                        <button className="btn" onClick={() => refetch()}>Retry</button>
                        </div>)
    if (pokeState.length === 0) return <p>No Pokemon...</p>

    return (
        <>  <SearchBox value={searchInput} onChange={setSearchInput} onSubmit={setPokeSearch} error={errorMessage} label="Find a Pokémon by name or number"/>
            < Sort sort={pokeSort} onChange={handleSortChange} />
            <TypeSelect type={pokeType} onChange={handleTypeChange} />
            <PokemonGrid pokemon={pokeState} />
        </>
    )

};