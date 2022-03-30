import { useCallback, useState } from "react";
import randomPiece from "../utils/randomPiece";
import { DISPLAYWIDTH } from "../configs";
import { isCollision } from "../utils/gameHelpers";

const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: DISPLAYWIDTH / 2 - 1, y: 0 },
    piece: [[0]],
    isCollided: false,
  });

  const rotate = (matrix, dir) => {
    //Turn rows into cols
    const Mat = matrix.map((_, index) => matrix.map((column) => column[index]));

    //Now reverse each row
    if (dir > 0) return Mat.map((row) => row.reverse());
    return Mat.reverse();
  };

  const playerRotate = (stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));

    clonedPlayer.piece = rotate(clonedPlayer.piece, dir);

    const x = clonedPlayer.pos.x;
    let offSet = 1;

    while (isCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offSet;
      offSet = -(offSet + (offSet > 0 ? 1 : -1));
      if (offSet > clonedPlayer.piece[0].length) {
        rotate(clonedPlayer.piece, -dir);
        clonedPlayer.pos.x = x;
        return;
      }
    }

    setPlayer(clonedPlayer);
    return player;
  };

  /* const playerRotate = (stage) => {
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
  }; */

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

  return [player, updatePlayerPosition, playerRotate, resetPlayer];
};

export default usePlayer;
