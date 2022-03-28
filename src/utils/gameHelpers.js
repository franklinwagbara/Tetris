///Constant declarations
const ArrowUp = "ArrowUp";
const ArrowLeft = "ArrowLeft";
const ArrowRight = "ArrowRight";

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
  rotatePlayer
) => {
  switch (code) {
    case ArrowUp:
      rotatePlayer();
      break;
    case ArrowLeft:
      moveX(player, stage, -1, updatePlayerPosition);
      break;
    case ArrowRight:
      moveX(player, stage, 1, updatePlayerPosition);
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

/* export const spurnPiece = (pieces, _stage) => {
  const stage = [..._stage];

  clearStage(stage);

  const index = Math.floor(Math.random() * 6);
  const types = ["O", "S", "I", "T", "Z", "J", "L"];
  const type = types[index];
  const piece = [...pieces[type].shape];
  //debugger;
  const y = 0;
  const x = Math.floor(Math.random() * (stage[0].length - piece.length));

  if (
    piece.length + y >= stage.length ||
    piece[0].length + x >= stage[0].length
  )
    return;

  for (let i = y; i < y + piece.length; i++) {
    for (let j = x; j < x + piece[0].length; j++) {
      if (isCollide(stage, piece, { x: i, y: j }, piece[i - y][j - x]))
        stage[i][j] = [piece[i - y][j - x], "merge"];
      else stage[i][j] = [piece[i - y][j - x], "clear"];
    }
  }

  return [stage, { x: x, y: y }, piece];
}; */

/* export const placePiece = (piece, pos, _stage) => {
  const stage = [..._stage];

  //Clear the stage
  clearStage(stage);

  const y = pos.y;
  const x = pos.x;
  let isMerge = false;
  //debugger;
  if (
    piece.length + y - 1 >= stage.length ||
    piece[0].length + x - 1 >= stage[0].length ||
    x < 0
  )
    return stage;

  if (isCollide(stage, piece, x, y, piece[piece.length - 1][0])) isMerge = true;
  else return stage;

  for (let i = y; i < y + piece.length; i++) {
    for (let j = x; j < x + piece[0].length; j++) {
      if (isMerge) stage[i][j] = [piece[i - y][j - x], "merge"];
      else stage[i][j] = [piece[i - y][j - x], "clear"];
    }
  }

  return stage;
}; */
/* 
export const spurnPiece = (pieces, _stage) => {
  const stage = [..._stage];

  clearStage(stage);

  const piece = randomPiece().shape;
  //debugger;
  const y = 0;
  const x = Math.floor(Math.random() * (stage[0].length - piece.length));

  if (
    piece.length + y >= stage.length ||
    piece[0].length + x >= stage[0].length
  )
    return;

  for (let i = y; i < y + piece.length; i++) {
    for (let j = x; j < x + piece[0].length; j++) {
      stage[i][j] = [piece[i - y][j - x], "clear"];
    }
  }

  return [stage, { x: x, y: y }, piece];
};

export const placePiece = (piece, pos, _stage) => {
  let stage = [..._stage];
  let stayOnScreen = false;
  let spurn = false;

  //Clear the stage
  clearStage(stage);

  const y = pos.y;
  const x = pos.x;
  let isMerge = false;
  //debugger;
  if (
    piece.length + y - 1 >= stage.length ||
    piece[0].length + x - 1 >= stage[0].length ||
    x < 0
  )
    return stage;

  if (isCollide(stage, piece, { x: x, y: y }, piece[piece.length - 1][0])) {
    //stage = setOnScreen(stage, piece, { x: x, y: y });
    stayOnScreen = true;
    spurn = true;
    console.log("collision");
  }

  stage = draw(stage, piece, { x: x, y: y }, stayOnScreen);

  //console.log(stage);
  return [stage, spurn];
};

export function movePiece(piece, pos, moveX = 0, moveY = 0, _stage) {
  let stage = [..._stage];
  let spurn = false;
  const x =
    pos.x + moveX <= stage[0].length - piece[0].length ? pos.x + moveX : pos.x;

  const y =
    pos.y + moveY <= stage.length - piece.length + 1 ? pos.y + moveY : pos.y;

  pos = { x: x, y: y };
  [stage, spurn] = placePiece(piece, pos, stage);
  console.log(stage);
  return [stage, pos, spurn];
}
 */
