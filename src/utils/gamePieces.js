const Pieces = {
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"],
    ],
    color: "229, 255, 0",
  },

  I: {
    shape: [["I"], ["I"], ["I"], ["I"]],
    color: "0, 217, 255",
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
    ],
    color: "255, 0, 0",
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
    ],
    color: "255, 230, 0",
  },
  L: {
    shape: [
      ["L", 0],
      ["L", 0],
      ["L", "L"],
    ],
    color: "3, 255, 141",
  },
  J: {
    shape: [
      [0, "L"],
      [0, "L"],
      ["L", "L"],
    ],
    color: "0, 255, 200",
  },
  T: {
    shape: [
      ["T", "T", "T"],
      [0, "T", 0],
    ],
    color: "255, 0, 179",
  },
};

export default Pieces;
