import { useState, useTransition } from "react";
function App() {
  const fruits = [
    "Apple",
    "Banana",
    "Orange",
    "Mango",
    "Pineapple",
    "Strawberry",
    "Blueberry",
    "Grapes",
    "Peach",
    "Watermelon",
    "Kiwi",
    "Papaya",
    "Cherry",
    "Pomegranate",
    "Lemon",
  ];
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();
  const size = 1000;
  return (
    <>
      <input
        type="search"
        onChange={(e) => {
          startTransition(() => {
            const datalist = [];
            for (let i = 0; i < size; i++) {
              datalist.push(e.target.value);
            }
            setList(datalist);
          });
        }}
      />
      {isPending ? (
        <div>Loading...</div>
      ) : (
        list.map((list) => {
          return <div key={list}>{list}</div>;
        })
      )}
    </>
  );
}

export default App;
