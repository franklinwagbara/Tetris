import React from "react";
import StyledPanel from "./styles/StyledPanel.styled";

function Panel({ gameOver, score, rows, level, onStartGame }) {
  return (
    <StyledPanel>
      {gameOver ? (
        <div style={{ color: "red" }}>GAME OVER</div>
      ) : (
        <>
          <div>SCORE: {score}</div>
          <div>ROWS: {rows}</div>
          <div>LEVEL: {level}</div>{" "}
        </>
      )}
      <button onClick={onStartGame}>START GAME</button>
    </StyledPanel>
  );
}

export default Panel;
