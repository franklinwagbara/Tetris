import { useCallback, useState } from "react";
import randomPiece from "../utils/randomPiece";
import { DISPLAYWIDTH } from "../configs";

const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: DISPLAYWIDTH / 2 - 1, y: 0 },
    piece: [[0]],
    isCollided: false,
  });

  const rotatePlayer = useCallback(() => {
    const piece = [...player.piece];
    const rowSize = piece[0].length;
    const columnSize = piece.length;
    const temp = new Array(rowSize);

    for (let y = 0; y < rowSize; y++) {
      temp[y] = new Array(columnSize);
      for (let x = 0; x < columnSize; x++) {
        temp[y][x] = piece[x][y];
      }
    }

    for (let y = 0; y < temp.length; y++) {
      let l = 0,
        r = temp[0].length - 1;
      while (l < r) {
        const tValue = temp[y][l];
        temp[y][l] = temp[y][r];
        temp[y][r] = tValue;
        l++;
        r--;
      }
    }

    setPlayer((prev) => ({
      ...prev,
      piece: temp,
    }));
  });

  function updatePlayerPosition(x, y, isCollided) {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: prev.pos.x + x, y: prev.pos.y + y },
      isCollided,
    }));
  }

  const resetPlayer = useCallback(() => {
    setPlayer((prev) => ({
      pos: { x: DISPLAYWIDTH / 2 - 1, y: 0 },
      piece: randomPiece().shape,
      isCollided: false,
    }));
  }, []);

  return [player, updatePlayerPosition, rotatePlayer, resetPlayer, setPlayer];
};

export default usePlayer;
