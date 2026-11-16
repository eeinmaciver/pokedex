import PokemonGrid from "../PokemonGrid/PokemonGrid"




export default function Pokedex() {

    const pokeList = [
            {name: "bulbasaur", id: "1"},
            {name: "charmander", id: "4"},
            {name: "squirtle", id: "7"}
        ]    
    return (
        <PokemonGrid pokemon={pokeList} />
    )

}