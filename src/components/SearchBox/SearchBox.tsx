interface SearchBoxProps {
  value: string | number;
  onChange: (value: string | number) => void;
  onSubmit: (value: string | number) => void;
  error: true | false
}

export default function SearchBox({ value, onChange, onSubmit, error }: Readonly<SearchBoxProps>) {


  return (
    <div className="field search-box">
      <label htmlFor="search">Find a Pokémon by name or number</label>
      <input id="search" type="text" value={value} onChange={(event) => onChange(event.target.value)}/>
      {value !== "" && (<>
        <button type="button" className="btn" onClick={() => onSubmit(value)}>Submit</button>
        {error && <p>Name not found</p>}
        <button type="button" className="btn" onClick={() => onChange("")}>Clear search</button></>
      )}
    </div>
  );
}