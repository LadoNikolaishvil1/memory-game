import { useEffect, useState, useRef } from "react";
import "./App.css";
import MemoryButton from "./components/MemoryButton";

function App() {
  const [GameStarted, setGameStarted] = useState(false);
  const [Array, setArray] = useState([]);
  const [flippedi, setFlippedi] = useState([]);
  const [flippedel, setFlippedel] = useState([]);
  const [matched, setMatched] = useState([]);
  const [ActiveButtonsTheme, setActiveButtonsTheme] = useState(["Numbers"]);
  const [GridSizeBtns, setGridSizeBtns] = useState(["4x4"]);
  const [ComponentSize, setComponentSize] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const timeoutRef = useRef(null);

  const RefreshVariables = () => {
    setFlippedi([]);
    setFlippedel([]);
    setMatched([]);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  const initializeGame = () => {
    // const initialArray = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

    if (GridSizeBtns[0] == "4x4") {
      const initialArray = [1, 2, 3, 4, 5, 6, 7, 8];
      setComponentSize("40px");
      if (ActiveButtonsTheme[0] == "Numbers") {
        setArray(shuffle([...initialArray, ...initialArray]));
      } else if (ActiveButtonsTheme[0] == "Icons") {
        const iconsArray = initialArray.map((el) => `${el}.png`);
        setArray(shuffle([...iconsArray, ...iconsArray]));
      }
    } else if (GridSizeBtns[0] == "6x6") {
      const initialArray = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
      ];
      setComponentSize("24px");
      if (ActiveButtonsTheme[0] == "Numbers") {
        setArray(shuffle([...initialArray, ...initialArray]));
      } else if (ActiveButtonsTheme[0] == "Icons") {
        const iconsArray = initialArray.map((el) => `${el}.png`);
        setArray(shuffle([...iconsArray, ...iconsArray]));
      }
    }

    RefreshVariables();
  };

  const newGame = () => {
    setGameStarted(false);
    RefreshVariables();
  };

  useEffect(() => {
    if (GameStarted) {
      initializeGame();
      console.log("Stated");
    }
  }, [GameStarted]);

  useEffect(() => {
    console.log(Array);
  }, [Array]);

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

  useEffect(() => {
    console.log(ActiveButtonsTheme);
  }, [ActiveButtonsTheme]);

  const toggleActiveTheme = (e, Array, setArray) => {
    if (Array.length == 0) {
      setArray([e.target.id]);
    } else if (Array.length > 0) {
      setArray(Array.slice(1));
      setArray([e.target.id]);
    }
  };

  return (
    <main
      style={{ background: !GameStarted ? "var(--black)" : "var(--White)" }}
    >
      {!GameStarted ? (
        <div className="container">
          <h1>memory</h1>
          <div className="ChoseDiv">
            <div className="SelectTheme">
              <p>Select Theme</p>
              <div className="ChooseBtns">
                <button
                  id="Numbers"
                  style={{
                    backgroundColor: ActiveButtonsTheme.includes("Numbers")
                      ? "var(--orange)"
                      : "",
                  }}
                  onClick={(e) => {
                    toggleActiveTheme(
                      e,
                      ActiveButtonsTheme,
                      setActiveButtonsTheme
                    );
                  }}
                >
                  Numbers
                </button>
                <button
                  id="Icons"
                  style={{
                    backgroundColor: ActiveButtonsTheme.includes("Icons")
                      ? "var(--orange)"
                      : "",
                  }}
                  onClick={(e) => {
                    toggleActiveTheme(
                      e,
                      ActiveButtonsTheme,
                      setActiveButtonsTheme
                    );
                  }}
                >
                  Icons
                </button>
              </div>
            </div>
            <div className="GridSize">
              <p>Grid Size</p>
              <div className="ChooseBtns">
                <button
                  id="4x4"
                  style={{
                    backgroundColor: GridSizeBtns.includes("4x4")
                      ? "var(--orange)"
                      : "",
                  }}
                  onClick={(e) => {
                    toggleActiveTheme(e, GridSizeBtns, setGridSizeBtns);
                  }}
                >
                  4x4
                </button>
                <button
                  id="6x6"
                  style={{
                    backgroundColor: GridSizeBtns.includes("6x6")
                      ? "var(--orange)"
                      : "",
                  }}
                  onClick={(e) => {
                    toggleActiveTheme(e, GridSizeBtns, setGridSizeBtns);
                  }}
                >
                  6x6
                </button>
              </div>
            </div>
            <button
              className="StartBtn"
              onClick={() => {
                setGameStarted(true);
              }}
            >
              Start Game
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="header">
            <h1 className="headname">memory</h1>
            <div className="ButtonBox">
              <button className="Restart" onClick={initializeGame}>
                Restart
              </button>
              <button className="NewGame" onClick={newGame}>
                New Game
              </button>
            </div>
            <button className="menu" onClick={toggleMenu}>
              Menu
            </button>
          </div>
          <div
            className="game"
            style={{
              gridTemplateColumns: `repeat(${GridSizeBtns[0].charAt(0)}, 1fr)`,
              gridTemplateRows: `repeat(${GridSizeBtns[0].charAt(0)}, 1fr)`,
            }}
          >
            {Array.map((el, i) => (
              <MemoryButton
                key={i}
                value={el}
                ComponentSize={ComponentSize}
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
                  className="Restart w-full bg-yellow-500 text-white py-3 rounded-[26px]"
                  onClick={initializeGame}
                >
                  Restart
                </button>
                <button
                  className="NewGame w-full bg-gray-200 text-gray-800 py-3 rounded-[26px]"
                  onClick={newGame}
                >
                  New Game
                </button>
                <button
                  onClick={toggleMenu}
                  className="NewGame w-full bg-gray-200 text-gray-800 py-3 rounded-[26px]"
                >
                  Resume Game
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default App;
