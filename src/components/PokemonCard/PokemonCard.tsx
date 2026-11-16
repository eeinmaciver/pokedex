
export interface PokemonProps {
    name: string;
    id: string;
}


export default function PokemonCard({ name, id }: PokemonProps) {


    return (
        <li >
            <p role="pokemonname">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
            <p>#{id}</p>
            <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +id+ ".png"} alt="Pokemon picture"/>
        </li>
    );
    
}