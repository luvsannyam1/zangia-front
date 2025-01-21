import { useEffect } from 'react'

import { useQuiz } from '../../context/QuizContext'
import { ScreenTypes } from '../../types'

import QuestionScreen from '../QuestionScreen'
import QuizDetailsScreen from '../QuizDetailsScreen'
import QuizTopicsScreen from '../QuizTopicsScreen'
import ResultScreen from '../ResultScreen'
import SplashScreen from '../SplashScreen'
import LoginScreen from '../LoginScreen'
import QuizsScreen from '../QuizsScreen'
import RegisterScreen from '../RegisterScreen'
import AdminScreen from '../AdminScreen'
import Navbar from '../NavBarScreen'

function Main() {
  const { currentScreen, setCurrentScreen } = useQuiz()

  useEffect(() => {
    setTimeout(() => {
      setCurrentScreen(ScreenTypes.LoginScreen)
    }, 1000)
  }, [setCurrentScreen])

  const screenComponents = {
    [ScreenTypes.SplashScreen]: <SplashScreen />,
    [ScreenTypes.LoginScreen]: <LoginScreen />,
    [ScreenTypes.QuizTopicsScreen]: <QuizTopicsScreen />,
    [ScreenTypes.QuizDetailsScreen]: <QuizDetailsScreen />,
    [ScreenTypes.QuestionScreen]: <QuestionScreen />,
    [ScreenTypes.ResultScreen]: <ResultScreen />,
    [ScreenTypes.QuizsScreen]: <QuizsScreen />,
    [ScreenTypes.RegisterScreen]: <RegisterScreen />,
    [ScreenTypes.AdminScreen]: <AdminScreen />,
  }

  const ComponentToRender = screenComponents[currentScreen] || <SplashScreen />

  return (
    <>
      <Navbar />
      {ComponentToRender}
    </>
  )
}

export default Main
