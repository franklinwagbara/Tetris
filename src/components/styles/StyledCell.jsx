import styled from "styled-components";

const StyledCell = styled.div`
  background-color: rgba(${({ color }) => color}, 0.8);
  border: ${({ value }) => (value === 0 ? "0px" : "4px solid")};
  border-bottom-color: rgba(${({ color }) => color}, 0.1);
  border-right-color: rgba(${({ color }) => color}, 1);
  border-top-color: rgba(${({ color }) => color}, 1);
  border-left-color: rgba(${({ color }) => color}, 0.3);
`;

export default StyledCell;
