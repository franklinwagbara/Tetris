import React from "react";
import Pieces from "../utils/gamePieces";
import StyledStage from "./styles/StyledStage.styled";
import Cell from "./Cell";

function Stage({ stage }) {
  const height = stage.length;
  const width = stage[0].length;
  return (
    <StyledStage height={height} width={width}>
      {stage.map((items, key2) =>
        items.map((item, key) => {
          return (
            <Cell
              key={key++ + key2++}
              value={item[0]}
              color={item[0] === 0 ? "0, 0, 0" : Pieces[item[0]].color}
            ></Cell>
          );
        })
      )}
    </StyledStage>
  );
}

export default Stage;
