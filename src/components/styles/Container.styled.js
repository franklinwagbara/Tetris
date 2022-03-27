import styled from "styled-components";
import bgImage from "../../img/bg5.jpg";

const Container = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100vmax;
  height: 100vh;
  padding-top: 5vh;
`;

export default Container;
