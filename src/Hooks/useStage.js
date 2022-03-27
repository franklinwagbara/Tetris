import { useState, useEffect } from "react";
import { createStage, clearStage } from "../utils/gameHelpers";
import { DISPLAYHEIGHT, DISPLAYWIDTH } from "./../configs";

const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage(DISPLAYHEIGHT, DISPLAYWIDTH));

  useEffect(() => {
    const updateStage = (prevStage, player) => {
      const newStage = clearStage(prevStage);
      const { pos, piece, isCollided } = player;

      piece.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0)
            newStage[y + pos.y][x + pos.x] = [
              value,
              `${isCollided ? "merged" : "clear"}`,
            ];
        });
      });

      return newStage;
    };
    setStage((prev) => updateStage(prev, player));
    if (player.isCollided) resetPlayer();
  }, [player]);

  return [stage, setStage];
};

export default useStage;
