import styled from "styled-components";

export const HeadWrapper = styled.div`
  & {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    grid-gap: 15px;
  }
  i {
    width: 100%;
    height: 1px;
    display: block;
    background: rgba( 255, 255, 255, 0.35);
  }
  h2 {
    padding: 0;
  }
`;
