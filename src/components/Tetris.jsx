import React, { useEffect, useState } from "react";
import Stage from "./Stage";
import useStage from "./../Hooks/useStage";
import usePlayer from "./../Hooks/usePlayer";
import Panel from "./Panel";
import Container from "./styles/Container.styled";
import { movePlayer, isCollision } from "../utils/gameHelpers";

function Tetris(props) {
  const [player, updatePlayerPosition, resetPlayer, setPlayer] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  console.log("re-render");

  return (
    <Container
      role="button"
      tabIndex={0}
      onKeyDown={(e) => movePlayer(e.code, player, stage, updatePlayerPosition)}
    >
      <Stage stage={stage} />
      <aside>
        <Panel />
      </aside>
    </Container>
  );
}

export default Tetris;
