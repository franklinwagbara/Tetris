import React from "react";
import StyledCell from "./styles/StyledCell";

function Cell({ value, color }) {
  return <StyledCell value={value} color={color}></StyledCell>;
}

export default Cell;
