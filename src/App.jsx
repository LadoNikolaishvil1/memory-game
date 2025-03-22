import { useEffect, useState } from "react";
import "./App.css";
import MemoryButton from "./components/MemoryButton";

function App() {
  const [Array, setArray] = useState([]);
  const [flippedi, setFlippedi] = useState([]);
  const [flippedel, setFlippedel] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    const initialArray = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    setArray(shuffle([...initialArray]));
  }, []);

  useEffect(() => {
    if (flippedel.length == 2 && flippedel[0] == flippedel[1]) {
      const newMatchedel = [...matched, flippedel[0], flippedel[1]];
      setMatched(newMatchedel);
    }

    if (flippedel.length > 2) {
      flippedel.shift();
      flippedel.shift();
    }
  }, [flippedel]);

  useEffect(() => {
    console.log("matched: ", matched);
  }, [matched]);

  const shuffle = (array) => {
    for (let i = array.length - 1; i >= 0; i--) {
      let random = Math.floor(Math.random() * (i + 1));
      [array[i], array[random]] = [array[random], array[i]];
    }

    return array;
  };

  const handleClick = (index, el) => {
    if (flippedi.includes(index)) return;

    const newFlippedi = [...flippedi, index];
    if (newFlippedi.length > 2) {
      newFlippedi.shift();
      newFlippedi.shift();
    }

    const newFlippedel = [...flippedel, el];

    setFlippedel(newFlippedel);
    setFlippedi(newFlippedi);
  };

  return (
    <main>
      <div className="header">
        <h1 className="headname">memory</h1>
        <button className="Restart">Restart</button>
        <button className="NewGame">New game</button>
        <button className="menu">menu</button>
      </div>
      <div className="game">
        {Array.map((el, i) => (
          <MemoryButton
            key={i}
            value={el}
            isActive={flippedi.includes(i)}
            isMatched={matched.includes(el)}
            onClick={() => handleClick(i, el)}
            style={
              flippedi.includes(i) || matched.includes(el)
                ? { backgroundColor: "#808080" }
                : {}
            }
          />
        ))}
      </div>
      <div className="counters"></div>
    </main>
  );
}

export default App;
