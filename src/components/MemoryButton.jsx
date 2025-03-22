import React, { useState } from "react";
import "./MemoryButton.css";

const MemoryButton = ({ value, isActive, onClick, isMatched }) => {
  return (
    <div
      className="MemoryButton"
      style={{
        backgroundColor: isActive
          ? "var(--orange)"
          : isMatched
          ? "var(--grey)"
          : "var(--darkgrey)",
        transform: `scaleX(${isActive || isMatched ? "-1" : "1"})`,
      }}
      onClick={onClick}
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
