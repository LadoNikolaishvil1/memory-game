import React, { useState } from "react";
import "./MemoryButton.css";

const MemoryButton = ({ value, isActive, onClick }) => {
  return (
    <div
      className="MemoryButton"
      style={{
        backgroundColor: "var(--darkgrey)",
        transform: `scaleX(${isActive ? "-1" : "1"})`,
      }}
      onClick={onClick}
    >
      <h1
        style={{
          color: "var(--white)",
          transform: `scaleX(-1)`,
          opacity: isActive ? "1" : "0",
        }}
      >
        {value}
      </h1>
    </div>
  );
};

export default MemoryButton;
