import { Link } from "react-router";


export interface PokemonProps {
    name: string;
    id: number;
}


export default function PokemonCard({ name, id }: PokemonProps) {


    return (
        <li >
            <Link to={`/pokedex/${id}`}>
            <p role="pokemonname">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
            </Link>
            <p>#{id}</p>
            <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +id+ ".png"} alt="Pokemon picture"/>
        </li>
    );
    
}