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

interface Pokemon {
    name: string;
    id: number
}

export interface PokemonQuery {
  type?: string;
}

export const getPokemonList = async (
  query: PokemonQuery,
  signal?: AbortSignal,
): Promise<PokemonListItem[]> => {
    if (query.type) {
        const data = await apiGet<PokemonTypeAPIResponse>(import.meta.env.VITE_API_URL,`/type/${query.type}`, signal);
        const pokemonData = data.pokemon.map((item) => item.pokemon) 
        return pokemonData
    }
    const data = await apiGet<PokemonAPIResponse>(import.meta.env.VITE_API_URL, '/pokemon?limit=20', signal);
    return data.results
}
    


export const getPokemon = async (
  nameOrId: string | number,
  signal?: AbortSignal,
): Promise<PokemonListItem> => {
    
    const data = await apiGet<Pokemon>(import.meta.env.VITE_API_URL, `/pokemon/${nameOrId}`, signal)
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${data.id}`
    return {name: data.name, url: pokemonUrl}

};