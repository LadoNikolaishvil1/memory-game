import { useEffect, useState, useRef } from "react";
import "./App.css";
import MemoryButton from "./components/MemoryButton";

function App() {
  const [Array, setArray] = useState([]);
  const [flippedi, setFlippedi] = useState([]);
  const [flippedel, setFlippedel] = useState([]);
  const [matched, setMatched] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const timeoutRef = useRef(null);

  const initializeGame = () => {
    const initialArray = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    setArray(shuffle([...initialArray]));
    setFlippedi([]);
    setFlippedel([]);
    setMatched([]);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flippedel.length === 2 && flippedel[0] === flippedel[1]) {
      const newMatchedel = [...matched, flippedel[0], flippedel[1]];
      setMatched(newMatchedel);
    }

    if (flippedel.length > 2) {
      setFlippedel(flippedel.slice(2));
    }
  }, [flippedel]);

  useEffect(() => {
    if (flippedi.length == 2) {
      timeoutRef.current = setTimeout(() => {
        setFlippedi(flippedi.slice(2));
        setFlippedel(flippedel.slice(2));
      }, 1000);
    } else if (flippedi.length > 2) {
      setFlippedi(flippedi.slice(2));
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, [flippedi]);

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
    const newFlippedel = [...flippedel, el];

    setFlippedel(newFlippedel);
    setFlippedi(newFlippedi);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <main className="relative">
      <div className="header">
        <h1 className="headname">memory</h1>
        <div className="ButtonBox">
          <button className="Restart" onClick={initializeGame}>
            Restart
          </button>
          <button className="NewGame">New Game</button>
        </div>
        <button className="menu" onClick={toggleMenu}>
          Menu
        </button>
      </div>
      <div className="game">
        {Array.map((el, i) => (
          <MemoryButton
            key={i}
            value={el}
            isActive={flippedi.includes(i)}
            isMatched={matched.includes(el)}
            onClick={() => handleClick(i, el)}
          />
        ))}
      </div>
      {isMenuOpen && (
        <div className="menu-positioner">
          <div className="menu-container">
            <button
              className="w-full bg-yellow-500 text-white py-3 rounded-[26px]"
              onClick={initializeGame}
            >
              Restart
            </button>
            <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-[26px]">
              New Game
            </button>
            <button
              onClick={toggleMenu}
              className="w-full bg-gray-200 text-gray-800 py-3 rounded-[26px]"
            >
              Resume Game
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
