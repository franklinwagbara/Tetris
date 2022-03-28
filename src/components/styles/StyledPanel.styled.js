import styled from "styled-components";

const StyledPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 300px;
  padding: 0 20px;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  color: white;

  & > div {
    width: 200px;
    height: 50px;
    border: 2px solid gray;
    border-radius: 20px;
    background: black;
    display: flex;
    align-items: center;
    padding-left: 15px;
  }

  & > button {
    outline: none;
    width: 200px;
    height: 50px;
    //border: none;
    border-radius: 20px;
    background: gray;
    cursor: pointer;
    color: white;
  }
`;

export default StyledPanel;
