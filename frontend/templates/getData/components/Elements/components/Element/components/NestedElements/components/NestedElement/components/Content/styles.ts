import styled from "styled-components";

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr 1fr;
  grid-gap: 15px;
  grid-template-areas: "element value processors";
`;
