import { useState } from 'react'
import { ThemeProvider } from 'styled-components'

import Main from './components/Main'
import QuizProvider from './context/QuizProvider'
import { GlobalStyles } from './styles/Global'
import { themes } from './styles/Theme'
import Navbar from './components/NavBarScreen'

function App() {
  const [currentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme || 'light'
  })

  const theme = currentTheme === 'light' ? themes.light : themes.dark

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <QuizProvider>
        <Main />
      </QuizProvider>
    </ThemeProvider>
  )
}

export default App
