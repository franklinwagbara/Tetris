import Pieces from "./gamePieces";

const randomPiece = () => {
  const index = Math.floor(Math.random() * 7);
  const types = ["O", "S", "I", "T", "Z", "J", "L"];
  const type = types[index];
  const piece = Pieces[type];

  return piece;
};

export default randomPiece;
