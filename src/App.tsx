// import Pokedex from "./components/Pokedex/Pokedex"
import PokemonCard from "./components/PokemonCard/PokemonCard"

interface PokemonProps {
    name: string;
    id: string;
}


export default function App({ name, id }: PokemonProps) {


    return (
        <div>

            <PokemonCard name="bulbasaur" id="1"/>
        </div>
    )

}