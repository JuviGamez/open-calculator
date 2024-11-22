import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  background: '#FFFFFF',
  calculatorBg: 'rgba(248, 249, 250, 0.95)',
  buttonBg: 'rgba(241, 243, 244, 0.95)',
  buttonHover: '#E8EAEB',
  accent: '#4285F4',
  text: '#202124',
  shadow: '0 10px 30px rgba(0,0,0,0.1), 0 0 40px rgba(66, 133, 244, 0.1)',
};

export const darkTheme = {
  background: '#121212',
  calculatorBg: 'rgba(30, 30, 30, 0.95)',
  buttonBg: 'rgba(45, 45, 45, 0.95)',
  buttonHover: '#353535',
  accent: '#8AB4F8',
  text: '#E8EAED',
  shadow: '0 10px 30px rgba(0,0,0,0.2), 0 0 40px rgba(138, 180, 248, 0.1)',
};

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Google Sans', 'Roboto', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`; 