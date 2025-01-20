import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

import { CheckIcon, Next, TimerIcon } from '../../config/icons'
import { useQuiz } from '../../context/QuizContext'
import { device } from '../../styles/BreakPoints'
import { PageCenter } from '../../styles/Global'
import { ScreenTypes } from '../../types'

import Button from '../ui/Button'
import ModalWrapper from '../ui/ModalWrapper'
import Question from './Question'
import QuizHeader from './QuizHeader'
import { QuizAnswer } from '../../models'
import socket from '../../config/socket'

const QuizContainer = styled.div<{ selectedAnswer: boolean }>`
  width: 900px;
  min-height: 500px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 4px;
  padding: 30px 60px 80px 60px;
  margin-bottom: 70px;
  position: relative;
  @media ${device.md} {
    width: 100%;
    padding: 15px 15px 80px 15px;
  }
  button {
    span {
      svg {
        path {
          fill: ${({ selectedAnswer, theme }) =>
            selectedAnswer ? `${theme.colors.buttonText}` : `${theme.colors.darkGray}`};
        }
      }
    }
  }
`

const LogoContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  @media ${device.md} {
    margin-top: 10px;
    margin-bottom: 20px;
    svg {
      width: 185px;
      height: 80px;
    }
  }
`

const ButtonWrapper = styled.div`
  position: absolute;
  right: 60px;
  bottom: 30px;
  display: flex;
  gap: 20px;
  @media ${device.sm} {
    justify-content: flex-end;
    width: 90%;
    right: 15px;
  }
`

const QuestionScreen: FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<QuizAnswer[]>([])
  const [showTimerModal, setShowTimerModal] = useState<boolean>(false)
  const [showResultModal, setShowResultModal] = useState<boolean>(false)
  const [time, setTime] = useState(0)

  const {
    questionAnswer,
    setQuestionAnswer,
    questions,
    quizDetail,
    result,
    setResult,
    setCurrentScreen,
  } = useQuiz()

  const currentQuestion = questions[activeQuestion]

  const { _id, question, answers, imageUrl, correctAnswer } = currentQuestion

  const onClickNext = () => {
    const isMatch: boolean = selectedAnswer.every((answer) => correctAnswer === answer)

    setResult([...result, { ...currentQuestion, selectedAnswer, isMatch }])

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1)
    } else {
      setShowResultModal(true)
    }
    setSelectedAnswer([])
  }

  const handleModal = () => {
    socket.emit('finishTest', {
      answer: questionAnswer,
    })
    setCurrentScreen(ScreenTypes.ResultScreen)
    document.body.style.overflow = 'auto'
  }

  // socket logic
  useEffect(() => {
    socket.connect()
    const startExam = () => {
      socket.emit('startExam', {
        testId: quizDetail._id,
      })
    }

    startExam()

    // Listen for events
    socket.on('examStarted', (data) => {
      console.log(data)
    })

    socket.on('answerSubmitted', (data) => {
      console.log(data)
      setQuestionAnswer(data)
    })

    socket.on('timerUpdate', ({ timeRemaining }) => {
      console.log(timeRemaining)
      setTime(timeRemaining)
    })

    socket.on('examFinished', ({ message }) => {
      setShowTimerModal(true)
    })

    socket.on('error', ({ message }) => {
      console.log(message)
    })

    // Cleanup on unmount
    return () => {
      socket.disconnect()
      socket.off() // Remove all listeners
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (showTimerModal || showResultModal) {
      document.body.style.overflow = 'hidden'
    }
  }, [showTimerModal, showResultModal])

  // Submit an answer
  const submitAnswer = (answer: string) => {
    socket.emit('submitAnswer', {
      questionId: _id,
      answer,
    })
  }

  return (
    <PageCenter>
      <LogoContainer></LogoContainer>
      <QuizContainer selectedAnswer={selectedAnswer.length > 0}>
        <QuizHeader
          activeQuestion={activeQuestion}
          totalQuestions={quizDetail.testQuestions.length}
          timer={time}
        />
        <Question
          question={question}
          code={''}
          image={imageUrl}
          answers={answers}
          handleAnswerSelection={submitAnswer}
          selectedAnswer={questionAnswer}
        />
        <ButtonWrapper>
          <Button
            text={
              activeQuestion === quizDetail.testQuestions.length - 1
                ? 'Дуусгах'
                : 'Дараагийнх'
            }
            onClick={onClickNext}
            icon={<Next />}
            iconPosition="right"
            disabled={quizDetail.testQuestions.length === 0}
          />
        </ButtonWrapper>
      </QuizContainer>
      {(showTimerModal || showResultModal) && (
        <ModalWrapper
          title={showResultModal ? 'Дууслаа!' : 'Цаг чинь дууслаа!'}
          subtitle={`Та нийт ${result.length} асуултанд хариулсан байна.`}
          onClick={handleModal}
          icon={showResultModal ? <CheckIcon /> : <TimerIcon />}
          buttonTitle="Үр дүнг харах"
        />
      )}
    </PageCenter>
  )
}

export default QuestionScreen
