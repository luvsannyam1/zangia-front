import { Dispatch, SetStateAction } from 'react'
import { Question, QuizQuestion } from '../models'

export enum ScreenTypes {
  SplashScreen,
  QuizTopicsScreen,
  QuizDetailsScreen,
  QuizsScreen,
  QuestionScreen,
  ResultScreen,
  LoginScreen,
  RegisterScreen,
  AdminScreen,
}

export interface Result extends Question {
  selectedAnswer: string[]
  isMatch: boolean
}

export type QuizContextTypes = {
  questionAnswer: QuestionAnswer[]
  setQuestionAnswer: (type: QuestionAnswer) => void
  quiz: QuizQuestion[]
  setQuiz: (type: QuizQuestion[]) => void
  currentScreen: ScreenTypes
  setCurrentScreen: Dispatch<SetStateAction<ScreenTypes>>
  quizTopic: string
  selectQuizTopic: (type: string) => void
  questions: any[]
  setQuestions: Dispatch<SetStateAction<any[]>>
  result: Result[]
  setResult: Dispatch<SetStateAction<any[]>>
  timer: number
  setTimer: Dispatch<SetStateAction<number>>
  endTime: number
  setEndTime: (type: number) => void
  quizDetail: any
  setQuizDetail: (type: any) => void
}

export type QuestionAnswer = {
  questionId: string
  answer: string
}
