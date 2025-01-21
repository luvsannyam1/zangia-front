import { createContext, useContext } from 'react'
import { QuizContextTypes, ScreenTypes } from '../types'

export const initialState: QuizContextTypes = {
  questionAnswer: [],
  setQuestionAnswer: () => {},
  setQuestionAnswers: () => {},
  quiz: [],
  setQuiz: () => {},
  currentScreen: ScreenTypes.SplashScreen,
  setCurrentScreen: () => {},
  quizTopic: '',
  selectQuizTopic: () => {},
  questions: [],
  setQuestions: () => {},
  result: [],
  setResult: () => {},
  timer: 15,
  setTimer: () => {},
  endTime: 0,
  setEndTime: () => {},
  quizDetail: {},
  setQuizDetail: () => {},
  resultData: {},
  setResultData: () => {},
}

export const QuizContext = createContext<QuizContextTypes>(initialState)

export function useQuiz() {
  return useContext(QuizContext)
}
