import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        font-family: Noto Sans KR,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
        background-color: #e9ecf1;
        color: #333333;
    }

    .text-red {   
        color: #c84a31 !important;
    }

    .text-blue {
        color: #1261c4 !important;
    }
`;

export default GlobalStyle;
