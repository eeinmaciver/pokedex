import { useParams } from "react-router";
import useTeam from "../hooks/useTeam";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import SearchBox from "../components/SearchBox/SearchBox";

export default function TeamPage() {
    const {teamId} = useParams();

    const { team, isLoading, error, refetch, handleSearchChange, pokeSearch, searchInput, setSearchInput, setPokeSearch, errorMessage, handleDeleteSearchChange, deleteInput, setDeleteSearch} = useTeam(Number(teamId))

    if (isLoading) return <p>Loading Teams...</p>
    if (error) return (<div>
        <p role="alert">{error}</p>
        <button className="btn" onClick={() => refetch()}>Retry</button>
    </div>)
    if (team.length === 0) return <p>No Team</p>

    return (
        <div>
            {team.map((t) => <PokemonCard key={t.id} name={t.pokemon_name} id={t.pokemon_id} />)}
            <SearchBox value={searchInput} onChange={handleSearchChange} onSubmit={setPokeSearch} error={errorMessage}/>
            <SearchBox value={deleteInput} onChange={handleDeleteSearchChange} onSubmit={setDeleteSearch} error={errorMessage}/>
        </div>
    )
}