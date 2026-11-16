interface ResultCountProps {
  count: number;
  label?: string;
}

export default function ResultCount({ count, label = "books" }: Readonly<ResultCountProps>) {
  return <p className="result-count">{count} {label}</p>;
}




// function ResultCount(props:{books:Book[]}) {
//     return (
//         <h3 className ="result-count">
//             {"Showing " + props.books.length +" books"}
//         </h3>
//     )
// }

// export default ResultCount