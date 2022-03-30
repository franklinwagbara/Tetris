import React from "react";
import Pieces from "../utils/gamePieces";
import StyledStage from "./styles/StyledStage.styled";
import Cell from "./Cell";

function Stage({ stage }) {
  const height = stage.length;
  const width = stage[0].length;
  return (
    <StyledStage height={height} width={width}>
      {stage.map((items) =>
        items.map((item, key) => (
          <Cell
            key={key++}
            value={item[0]}
            color={item[0] === 0 ? "0, 0, 0" : Pieces[item[0]].color}
          ></Cell>
        ))
      )}
    </StyledStage>
  );
}

export default Stage;
