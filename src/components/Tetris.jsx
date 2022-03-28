import React, { useEffect, useState } from "react";
import Stage from "./Stage";
import useStage from "./../Hooks/useStage";
import usePlayer from "./../Hooks/usePlayer";
import Panel from "./Panel";
import Container from "./styles/Container.styled";
import { movePlayer, moveDown, isCollision } from "../utils/gameHelpers";
import useInterval from "./../Hooks/useInterval";
import { createStage } from "./../utils/gameHelpers";
import { DISPLAYHEIGHT, DISPLAYWIDTH } from "./../configs";

function Tetris(props) {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updatePlayerPosition, rotatePlayer, resetPlayer, setPlayer] =
    usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  const StartGame = () => {
    setStage(createStage(DISPLAYHEIGHT, DISPLAYWIDTH));
    setGameOver(false);
    resetPlayer();
  };

  return (
    <Container
      role="button"
      tabIndex={0}
      onKeyDown={(e) =>
        movePlayer(e.code, player, stage, updatePlayerPosition, rotatePlayer)
      }
    >
      <Stage stage={stage} />
      <aside>
        <Panel
          gameOver={gameOver}
          score={0}
          rows={0}
          level={0}
          onStartGame={StartGame}
        />
      </aside>
    </Container>
  );
}

export default Tetris;
