import React, { useState } from "react";
import "./MemoryButton.css";

const MemoryButton = ({ value, isActive, onClick, isMatched }) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      className="MemoryButton"
      style={{
        backgroundColor: isActive
          ? "var(--orange)"
          : isMatched
          ? "var(--grey)"
          : isHovered
          ? "var(--lightblue)"
          : "var(--darkgrey)",
        transform: `scaleX(${isActive || isMatched ? "-1" : "1"})`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={!isMatched ? onClick : () => {}}
    >
      <h1
        style={{
          color: "var(--white)",
          transform: `scaleX(-1)`,
          opacity: isActive || isMatched ? "1" : "0",
        }}
      >
        {value}
      </h1>
    </div>
  );
};

export default MemoryButton;
