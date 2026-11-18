import { useParams } from "react-router";
import { usePokemon } from "../hooks/usePokemon";
import NotFoundPage from "./NotFoundPage";

export default function PokemonPage() {
    const {pokemonId} = useParams();
    let RegEx = /[a-z]/
    if (RegEx.test(pokemonId!.trim())) {
        return (
            <NotFoundPage/>
        )
    }
    if (Number(pokemonId)! > 1025) {
        return (
            <h2>
                Pokemon not found
            </h2>
        )
    }


    const { pokemon, isLoading, error, refetch } = usePokemon(Number(pokemonId!))
    const p = pokemon[0]
    
    if( isLoading ) return <p>Loading Pokemon...</p>
    if (error) return (<div>
                        <p role="alert">{error}</p>
                        <button className="btn" onClick={() => refetch()}>Retry</button>
                        </div>)
    if (pokemon.length === 0) return <p>No Pokemon...</p>

    return (
        <>
            <h2>
                {p.name}, Id: #{p.id}
            </h2>
            <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +p.id+ ".png"} alt="Pokemon picture"/>
            <p>
                Weight: {p.weight}, Height; {p.height}, Types: {p.typeList.toString()}
            </p>
        </>
    )
}
