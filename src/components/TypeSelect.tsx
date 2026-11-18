
import { pokemonTypeList } from "../lib/pokemon";

interface typeListProps {
    type: string;
    onChange: (value: string) => void
    }

export default function TypeSelect (props: typeListProps) {
    const { onChange, type} = props
    return (
        <select value={type} onChange={(event) => onChange(event.target.value)}>
            {pokemonTypeList.map((type) => <option key={type} value={type}>{type ? type : "all types"}</option>)}
        </select>
    )
}