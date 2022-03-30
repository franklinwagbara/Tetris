import { useState, useEffect } from "react";
import { createStage, clearStage } from "../utils/gameHelpers";
import { DISPLAYHEIGHT, DISPLAYWIDTH } from "./../configs";

const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage(DISPLAYHEIGHT, DISPLAYWIDTH));
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = (newStage) =>
      newStage.reduce((ack, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          ack.unshift(new Array(newStage[0].length).fill([0, "clear"]));
          return ack;
        }
        ack.push(row);
        return ack;
      }, []);

    const updateStage = (prevStage) => {
      const newStage = clearStage(prevStage);

      for (let y = 0; y < player.piece.length; y++)
        for (let x = 0; x < player.piece[0].length; x++)
          if (player.piece[y][x] !== 0)
            newStage[y + player.pos.y][x + player.pos.x] = [
              player.piece[y][x],
              `${player.isCollided ? "merged" : "clear"}`,
            ];

      if (player.isCollided) {
        resetPlayer();
        return sweepRows(newStage);
      }

      return newStage;
    };
    setStage((prev) => updateStage(prev, player));
  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};

export default useStage;
