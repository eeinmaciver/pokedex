import { type PokemonListItem } from "../../types";
import PokemonCard from "../PokemonCard/PokemonCard";
import idFromUrl from "../../lib/pokemon";

interface gridProps {
    pokemon: PokemonListItem[];
}



export default function PokemonGrid({ pokemon }: gridProps) {

    

    return (
        <ul>
            {pokemon.map((poke) => (
                <PokemonCard key={idFromUrl(poke.url)} name={poke.name} id ={idFromUrl(poke.url)}/>
            ))}
        </ul>
    );
}