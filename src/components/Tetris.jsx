import React, { useState } from "react";
import Stage from "./Stage";
import useStage from "./../Hooks/useStage";
import usePlayer from "./../Hooks/usePlayer";
import Panel from "./Panel";
import Container from "./styles/Container.styled";
import { movePlayer, isCollision } from "../utils/gameHelpers";
import useInterval from "./../Hooks/useInterval";
import { createStage } from "./../utils/gameHelpers";
import { DISPLAYHEIGHT, DISPLAYWIDTH } from "./../configs";
import { useGameStatus } from "./../Hooks/useGameStatus";

function Tetris(props) {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updatePlayerPosition, playerRotate, resetPlayer] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);

  const StartGame = () => {
    setStage(createStage(DISPLAYHEIGHT, DISPLAYWIDTH));
    setGameOver(false);
    resetPlayer();
    setDropTime(1000);
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    //Increase the level when a row has being cleared by the player
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);

      //Also increase the speed of the player
      setDropTime(1000 / (level + 1) + 200);
    }
    if (!isCollision(player, stage, { x: 0, y: 1 }))
      updatePlayerPosition(0, 1, false);
    else {
      //Game Over
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPosition(0, 0, true);
    }
  };

  const keyUp = ({ key }) => {
    if (key === "ArrowDown") setDropTime(1000 / (level + 1) + 200);
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  useInterval(() => drop(), dropTime);

  return (
    <Container
      role="button"
      tabIndex={0}
      onKeyDown={(e) =>
        movePlayer(
          e.code,
          player,
          stage,
          updatePlayerPosition,
          dropPlayer,
          playerRotate
        )
      }
      onKeyUp={(e) => keyUp(e)}
    >
      <Stage stage={stage} />
      <aside>
        <Panel
          gameOver={gameOver}
          score={score}
          rows={rows}
          level={level}
          onStartGame={StartGame}
        />
      </aside>
    </Container>
  );
}

export default Tetris;
