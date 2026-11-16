import { type PokemonProps } from "../PokemonCard/PokemonCard";
import PokemonCard from "../PokemonCard/PokemonCard";

interface gridProps {
    pokemon: PokemonProps[];
}

export default function PokemonGrid({ pokemon }: gridProps) {
    return (
        <ul>
            {pokemon.map((poke) => (
                <PokemonCard key={poke.id} name={poke.name} id ={poke.id}/>
            ))}
        </ul>
    );
}