import { useState, useEffect } from "react";
import { type PokemonListItem } from "../types";


interface PokemonTypeAPIResponse {
    pokemon: PokemonTypeListItem[]
}

interface PokemonTypeListItem {
    slot: number;
    pokemon: PokemonListItem
}

interface PokemonAPIResponse {
    results: PokemonListItem[]
}

export function usePokemonList() {
    const [pokeState, setPokeState] = useState<PokemonListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>();
    const [pokeType, setPokeType] = useState<string>("")
  

    
  useEffect(() => {
      const fetchPokemon = async () => {
          setIsLoading(true);
          try {
              if (pokeType) {
              const res = await fetch(`${import.meta.env.VITE_API_URL}/type/${pokeType}`);
              if (!res.ok) {
                  throw new Error(`Could not load Pokémon (${res.status})`);
              }
              const data: PokemonTypeAPIResponse = await res.json()

              const pokemonArray = data.pokemon.map((item) => item.pokemon)
              const num = pokemonArray.length
              const arrayOut = num > 24 ? pokemonArray.slice(0,24) : pokemonArray
              setPokeState(arrayOut)
              }
              else {

              const res = await fetch(`${import.meta.env.VITE_API_URL}/pokemon?limit=20`);
              if (!res.ok) {
                  throw new Error(`Could not load Pokémon (${res.status})`);
              }
              const data: PokemonAPIResponse = await res.json()
              setPokeState(data.results)
              }}
          catch (err) {
              console.error("the error!", err)
              setError(err instanceof Error ? err.message : "Something went wrong") 
          } finally {
              setIsLoading(false);
          }
      }
      fetchPokemon()
  }, [pokeType])
  
  return { pokeState, isLoading, error, pokeType, setPokeType };
}

// try {
