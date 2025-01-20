import { ReactNode, useState, useEffect } from 'react'
import { QuestionAnswer, QuizContextTypes, Result, ScreenTypes } from '../types'
import { QuizContext, initialState } from './QuizContext'
import { QuizQuestion } from '../models'

type QuizProviderProps = {
  children: ReactNode
}

const QuizProvider = ({ children }: QuizProviderProps) => {
  const [timer, setTimer] = useState<number>(initialState.timer)
  const [endTime, setEndTime] = useState<number>(initialState.endTime)
  const [quizTopic, setQuizTopic] = useState<string>(initialState.quizTopic)
  const [quizDetail, setQuizDetail] = useState<any>()
  const [quiz, setQuiz] = useState<QuizQuestion[]>(initialState.quiz)
  const [result, setResult] = useState<Result[]>(initialState.result)
  const [currentScreen, setCurrentScreen] = useState<ScreenTypes>(
    initialState.currentScreen
  )

  const [questions, setQuestions] = useState<QuizQuestion[]>([])

  const [questionAnswer, setAnswer] = useState<QuestionAnswer[]>([])

  const selectQuizTopic = (topic: string) => {
    setQuizTopic(topic)
  }
  const setQuestionAnswer = (answer: QuestionAnswer) => {
    const newQuestionAnswer = questionAnswer
    setAnswer([...newQuestionAnswer, answer])
    const existingIndex = newQuestionAnswer.findIndex(
      (item) => item.questionId === answer.questionId
    )

    if (existingIndex !== -1) {
      // Update the answer if questionId exists
      newQuestionAnswer[existingIndex].answer = answer.answer
    } else {
      // Push the new answer if questionId does not exist
      newQuestionAnswer.push(answer)
    }
    setAnswer(newQuestionAnswer)
  }

  useEffect(() => {
    quizDetail && setQuestions(quizDetail.testQuestions)
  }, [quizDetail])

  const quizContextValue: QuizContextTypes = {
    questionAnswer,
    setQuestionAnswer,
    quiz,
    setQuiz,
    currentScreen,
    setCurrentScreen,
    quizTopic,
    selectQuizTopic,
    questions,
    setQuestions,
    result,
    setResult,
    timer,
    setTimer,
    endTime,
    setEndTime,
    quizDetail,
    setQuizDetail,
  }

  return <QuizContext.Provider value={quizContextValue}>{children}</QuizContext.Provider>
}

export default QuizProvider
