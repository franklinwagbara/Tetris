import { useState, useEffect } from "react";
import { createStage, clearStage } from "../utils/gameHelpers";
import { DISPLAYHEIGHT, DISPLAYWIDTH } from "./../configs";

const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage(DISPLAYHEIGHT, DISPLAYWIDTH));

  useEffect(() => {
    const updateStage = (prevStage) => {
      const newStage = clearStage(prevStage);

      for (let y = 0; y < player.piece.length; y++)
        for (let x = 0; x < player.piece[0].length; x++)
          if (player.piece[y][x] !== 0)
            newStage[y + player.pos.y][x + player.pos.x] = [
              player.piece[y][x],
              `${player.isCollided ? "merged" : "clear"}`,
            ];

      if (player.isCollided) resetPlayer();
      return newStage;
    };
    setStage((prev) => updateStage(prev, player));
  }, [player, resetPlayer]);

  return [stage, setStage];
};

export default useStage;
