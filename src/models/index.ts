// Question Types
// 1. MCQs | Multiple Choice | single
// 2. boolean | true/false | single
// 3. MAQs | Multiple Answers | multiple

type Choice = string
type CorrectAnswers = string[]

export type Question = {
  question: string
  choices: Choice[]
  type: 'MCQs' | 'MAQs' | 'boolean'
  correctAnswers: CorrectAnswers
  score: number
  code?: string
  image?: string
}

export type Topic = {
  topic: string
  level: string
  totalQuestions: number
  totalScore: number
  totalTime: number
  questions: Question[]
}

export interface QuizAnswer {
  _id: string
  description: string
  imageUrl: string
  __v: number
}

export interface QuizQuestion {
  imgUrl: string
  _id: string
  question: string
  answers: QuizAnswer[]
  correctAnswer: QuizAnswer
  imgUrls: string[]
  videoUrls: string[]
  __v: number
}

export type User = {
  _id: string
  name: string
  lastName: string
  email: string
  phone: number
  address: string
  birthday: string
  photoURL: string
  role: 'user' | 'admin'
  createdAt: Date
  __v: number
}
