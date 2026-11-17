interface SearchBoxProps {
  value: string | number;
  onChange: (value: string | number) => void;
  onSubmit: (value: string | number) => void;
}

export default function SearchBox({ value, onChange, onSubmit }: Readonly<SearchBoxProps>) {


  return (
    <div className="field search-box">
      <label htmlFor="search">Find a Pokémon by name or number</label>
      <input id="search" type="text" value={value} onChange={(event) => onChange(event.target.value)}/>
      {value !== "" && (<>
        <button type="button" className="btn" onClick={() => onSubmit(value)}>Submit</button>
        <button type="button" className="btn" onClick={() => onSubmit("")}>Clear search</button></>
      )}
    </div>
  );
}
