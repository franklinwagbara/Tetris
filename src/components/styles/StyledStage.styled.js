import styled from "styled-components";

const StyledStage = styled.div`
  background-color: #222;
  display: grid;
  grid-template-rows: repeat(
    ${(props) => props.height},
    calc(26vw / ${(props) => props.width})
  );
  grid-template-columns: repeat(
    ${(props) => props.width},
    calc(26vw / ${(props) => props.width})
  );
  grid-gap: 1px;
  max-width: 28vw;
  align-items: stretch;
  justify-content: stretch;
  height: fit-content;
  border: 2px solid gray;

  @media screen and (max-width: 700px) {
    grid-template-rows: repeat(
      ${(props) => props.height},
      calc(50vw / ${(props) => props.width})
    );
    grid-template-columns: repeat(
      ${(props) => props.width},
      calc(50vw / ${(props) => props.width})
    );

    max-width: 57vw;
  }

  @media screen and (min-width: 700px) and (max-width: 900px) {
    grid-template-rows: repeat(
      ${(props) => props.height},
      calc(40vw / ${(props) => props.width})
    );
    grid-template-columns: repeat(
      ${(props) => props.width},
      calc(40vw / ${(props) => props.width})
    );

    max-width: 45vw;
  }
`;
export default StyledStage;
