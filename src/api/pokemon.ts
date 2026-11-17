import { type PokemonListItem } from "../types";
import { apiGet } from "./client";

interface PokemonTypeListItem {
    slot: number;
    pokemon: PokemonListItem
}

interface PokemonAPIResponse {
    results: PokemonListItem[]
}

interface PokemonTypeAPIResponse {
    pokemon: PokemonTypeListItem[]
}

export interface PokemonQuery {
  type?: string;
}

export const getPokemonList = async (
  query: PokemonQuery,
  signal?: AbortSignal,
): Promise<PokemonListItem[]> => {
    if (query.type) {
        const data = await apiGet<PokemonTypeAPIResponse>(`/type/${query.type}`, signal);
        const pokemonData = data.pokemon.map((item) => item.pokemon) 
        return pokemonData
    }
    const data = await apiGet<PokemonAPIResponse>('/pokemon?limit=20', signal);
    return data.results
}
    


// export const getPokemon = (
//   nameOrId: string | number,
//   signal?: AbortSignal,
// ): Promise<Pokemon> => {
// };