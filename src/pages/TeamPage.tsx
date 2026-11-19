import { useParams } from "react-router";
import useTeam from "../hooks/useTeam";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import SearchBox from "../components/SearchBox/SearchBox";

export default function TeamPage() {
    const {teamId} = useParams();

    const { team, isLoading, error, refetch, addInput, handleAddInputChange, setAddSearch, addErrorMessage, delErrorMessage, handleDelInputChange, delInput, setDelSearch} = useTeam(Number(teamId))

    if (isLoading) return <p>Loading Teams...</p>
    if (error) return (<div>
        <p role="alert">{error}</p>
        <button className="btn" onClick={() => refetch()}>Retry</button>
    </div>)
    if (team.length === 0) return <p>No Team</p>

    return (
        <div>
            {team.map((t) => <PokemonCard key={t.id} name={t.pokemon_name} id={t.pokemon_id}/>)}
            <SearchBox value={addInput} onChange={handleAddInputChange} onSubmit={setAddSearch} error={addErrorMessage} label="Add Pokemon to Team"/>
            <SearchBox value={delInput} onChange={handleDelInputChange} onSubmit={setDelSearch} error={delErrorMessage} label="Remove Pokemon from Team"/>
        </div>
    )
}