///Constant declarations
const ArrowUp = "ArrowUp";
const ArrowLeft = "ArrowLeft";
const ArrowRight = "ArrowRight";
const ArrowDown = "ArrowDown";

export const createStage = (height, width) => {
  let arr = new Array(height);

  for (let i = 0; i < height; i++) {
    arr[i] = new Array(width).fill([0, "clear"]);
    arr.name = "name";
  }

  return arr;
};

export const clearStage = (stage) => {
  const newStage = stage.map((row) =>
    row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
  );
  return newStage;
};

export const updateStage = (prevStage, player) => {
  const newStage = clearStage(prevStage);
  const { pos, piece, isCollided } = player;

  piece.forEach((row, y) => {
    row.forEach((value, x) => {
      newStage[y + pos.y][x + pos.x] = [
        value,
        `${isCollided ? "merged" : "clear"}`,
      ];
    });
  });

  return newStage;
};

export const isCollision = (player, stage, moveTo) => {
  const { x: moveX, y: moveY } = moveTo;
  const { pos } = player;
  const { piece } = player;

  for (let y = 0; y < piece.length; y++)
    for (let x = 0; x < piece[0].length; x++) {
      if (piece[y][x] !== 0) {
        if (
          !stage[y + pos.y + moveY] ||
          !stage[y + pos.y + moveY][x + pos.x + moveX] ||
          stage[y + pos.y + moveY][x + pos.x + moveX][1] !== "clear"
        )
          return true;
      }
    }
  return false;
};

export const moveX = (player, stage, dir, updatePlayerPosition) => {
  if (!isCollision(player, stage, { x: dir, y: 0 }))
    updatePlayerPosition(dir, 0, false);
};

export const moveDown = (player, stage, updatePlayerPosition) => {
  if (!isCollision(player, stage, { x: 0, y: 1 })) {
    updatePlayerPosition(0, 1, false);

    return;
  }

  updatePlayerPosition(0, 0, true);
};

export const movePlayer = (
  code,
  player,
  stage,
  updatePlayerPosition,
  dropPlayer,
  playerRotate
) => {
  switch (code) {
    case ArrowUp:
      playerRotate(stage, 1);
      break;
    case ArrowLeft:
      moveX(player, stage, -1, updatePlayerPosition);
      break;
    case ArrowRight:
      moveX(player, stage, 1, updatePlayerPosition);
      break;
    case ArrowDown:
      dropPlayer();
      break;
    default:
      break;
  }
};

/* export const swap = (A, r, l) => {
  const tValue = temp[y][l];
  A[y][l] = A[y][r];
  A[y][r] = tValue;
  return A;
}; */

export const draw = (stage, piece, { x, y }, stayOnScreen) => {
  for (let i = y; i < y + piece.length; i++) {
    for (let j = x; j < x + piece[0].length; j++) {
      if (stayOnScreen && piece[i - y][j - x] != 0)
        stage[i][j] = [piece[i - y][j - x], "merge"];
      else stage[i][j] = [piece[i - y][j - x], "clear"];
    }
  }

  return stage;
};
