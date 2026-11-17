export interface PokemonListItem {
  name: string;
  url: string;
}

export interface TeamMember { id: number; pokemon_id: number; pokemon_name: string }
export type NewTeamMember = Omit<TeamMember, "id">;