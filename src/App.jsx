import { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Calculator from './components/Calculator'
import { lightTheme, darkTheme, GlobalStyles } from './theme'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <AppContainer>
        <Calculator />
      </AppContainer>
    </ThemeProvider>
  )
}

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.background};
  transition: background-color 0.3s ease;
`

export default App
