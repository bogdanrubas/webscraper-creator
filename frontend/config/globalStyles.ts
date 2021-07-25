import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    font-family: 'Bai Jamjuree';
    background: ${theme.colors.background.bg};
  }


  input, textarea {
    font-family: 'Bai Jamjuree';
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  p {
    margin: 0;
    padding: 0;
    color: ${theme.colors.text.normal}
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
    color: ${theme.colors.text.accent}
  }


`;

export default GlobalStyle;
