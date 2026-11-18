
interface SortProps {
    sort: string;
    onChange: (value: string) => void
    }


export default function Sort(props: SortProps) {
    const { sort, onChange } = props
    return (
        <label>
            Sort by:
            <select value={sort} onChange={(event) => onChange(event.target.value)}>
                <option value="number">number</option>
                <option value="name">name</option>
            </select>
        </label>
    )
}