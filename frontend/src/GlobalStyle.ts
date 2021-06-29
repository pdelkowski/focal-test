import { createGlobalStyle } from "styled-components";
import { theme } from "config";

const GlobalStyle = createGlobalStyle`
  html {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  }

  body {
    margin: 0;
    font-family: sans-serif;
    line-height: 1.4;
    background-color: ${theme.palette.bg};
  }

  select {
    font-family: sans-serif;
  }

  .u-pointer {
    cursor: pointer;
  }

  :not(button):not(input):not([class=*'u-pointer']){
    cursor: default;
  }
  
  th{
    cursor: default;
  }
`;

export default GlobalStyle;
