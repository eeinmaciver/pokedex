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

interface types {
    type: {name: string; url: string}
}

export interface Pokemon {
    name: string;
    id: number;
    weight: number;
    height: number;
    types: types[]
}
export interface PokemonFetch {
    name: string;
    id: number;
    weight: number;
    height: number;
    typeList: string[]
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
): Promise<PokemonFetch[]> => {
    
    const data = await apiGet<Pokemon>(import.meta.env.VITE_API_URL, `/pokemon/${nameOrId}`, signal)
    const types = data.types.map((element) => element.type.name)
    const finalData: PokemonFetch = {name: data.name, id: data.id, weight: data.weight, height: data.height, typeList: types}
    return [finalData]

};