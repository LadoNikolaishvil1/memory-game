import React, { useState } from "react";
import "./MemoryButton.css";

const MemoryButton = ({
  value,
  isActive,
  onClick,
  isMatched,
  ComponentSize,
}) => {
  const [isHovered, setIsHovered] = useState(false);
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
      {value.length > 2 ? (
        <img
          src={value}
          alt=""
          style={{
            width: ComponentSize,
            height: ComponentSize,
            transform: `scaleX(-1)`,
            opacity: isActive || isMatched ? "1" : "0",
          }}
        />
      ) : (
        <h1
          style={{
            color: "var(--white)",
            fontSize: ComponentSize,
            transform: `scaleX(-1)`,
            opacity: isActive || isMatched ? "1" : "0",
          }}
        >
          {value}
        </h1>
      )}
    </div>
  );
};

export default MemoryButton;
