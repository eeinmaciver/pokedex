interface SearchBoxProps {
  value: string | number;
  onChange: (value: string | number) => void;
  onSubmit: (value: string | number) => void;
  error: string
  label: string
}

export default function SearchBox({ value, onChange, onSubmit, error, label }: Readonly<SearchBoxProps>) {


  return (
    <div className="field search-box">
      <label htmlFor="search">{label}</label>
      <input id="search" type="text" value={value} onChange={(event) => onChange(event.target.value)}/>
      {value !== "" && (<>
        <button type="button" className="btn" onClick={() => onSubmit(value)}>Submit</button>
        <button type="button" className="btn" onClick={() => onChange("")}>Clear search</button>
        <p>{error}</p></>
        
      )}
    </div>
  );
}