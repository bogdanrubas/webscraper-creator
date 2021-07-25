import styled from "styled-components";
import { theme } from "config/theme";

export const HeadWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 15px;
  align-items: center;
  i {
    display: block;
    width: 100%;
    height: 1px;
    background: black;
  }
`;
