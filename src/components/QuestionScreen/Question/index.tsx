import { FC } from 'react'
import styled from 'styled-components'

import { device } from '../../../styles/BreakPoints'

import CodeSnippet from '../../ui/CodeSnippet'
import Answer from '../Answer'
import QuizImage from '../../ui/QuizImage'
import { QuizAnswer } from '../../../models'
import { QuestionAnswer } from '../../../types'

const QuestionContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 40px;
  max-width: 88%;
  @media ${device.sm} {
    max-width: 100%;
  }
`

const AnswersContainer = styled.div`
  max-width: 78%;
  @media ${device.sm} {
    max-width: 100%;
  }
`

const QuestionStyle = styled.h2`
  font-weight: 500;
  margin-bottom: 25px;
  color: ${({ theme }) => theme.colors.primaryText};
  line-height: 1.3;
`

interface QuestionTypes {
  id: string
  question: string
  code?: string
  imgUrls: string[]
  answers: QuizAnswer[]
  selectedAnswer: QuestionAnswer[]
  handleAnswerSelection: (answer: string) => void
}

const Question: FC<QuestionTypes> = ({
  id,
  question,
  code,
  imgUrls,
  answers,
  selectedAnswer,
  handleAnswerSelection,
}) => {
  return (
    <QuestionContainer>
      <QuestionStyle>{question}</QuestionStyle>
      {code && <CodeSnippet code={code} language="javascript" />}

      {imgUrls?.length !== 0 &&
        imgUrls.map((url, index) => <QuizImage key={index} image={url} />)}
      <AnswersContainer>
        {answers.map((choice, index) => (
          <Answer
            id={id}
            answer={choice}
            index={index}
            key={index}
            onChange={(e) => handleAnswerSelection(choice._id)}
            selectedAnswer={selectedAnswer}
          />
        ))}
      </AnswersContainer>
    </QuestionContainer>
  )
}

export default Question
