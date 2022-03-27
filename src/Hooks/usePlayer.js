import { useState } from "react";
import randomPiece from "../utils/randomPiece";

const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    piece: randomPiece().shape,
    isCollided: false,
  });

  function updatePlayerPosition(x, y, isCollided) {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: prev.pos.x + x, y: prev.pos.y + y },
      isCollided,
    }));
  }

  const resetPlayer = () => {
    setPlayer((prev) => ({
      pos: { x: 0, y: 0 },
      piece: randomPiece().shape,
      isCollided: false,
    }));
  };

  return [player, updatePlayerPosition, resetPlayer, setPlayer];
};

export default usePlayer;
