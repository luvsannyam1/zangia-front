import { FC } from 'react'
import styled, { css } from 'styled-components'
import { device } from '../../../styles/BreakPoints'
import { QuizAnswer } from '../../../models'
import { QuestionAnswer } from '../../../types'

const AnswerStyle = styled.div<{ highlightAnswer: boolean }>`
  color: ${({ theme }) => theme.colors.secondaryText};
  font-weight: 400;
  border: 1px solid
    ${({ highlightAnswer, theme }) =>
      highlightAnswer ? `${theme.colors.themeColor}` : `${theme.colors.border}`};
  background-color: ${({ highlightAnswer, theme }) =>
    highlightAnswer ? `${theme.colors.selectedAnswer}` : ``};
  border-radius: 16px;
  margin-top: clamp(13px, calc(10px + 6 * ((100vw - 600px) / 1320)), 16px);
  cursor: pointer;
  ${({ highlightAnswer }) =>
    highlightAnswer &&
    css`
      transition: border 0.2s ease-in;
    `}
  @media ${device.md} {
    font-weight: 500;
  }
  input {
    visibility: hidden;
    margin: 0;
  }
`

const AnswerLabel = styled.label`
  padding: 18px;
  display: flex;
  cursor: pointer;
  @media ${device.md} {
    padding: 14px;
  }
`

const ChoiceLabel = styled.span``
const SelectionText = styled.input`
  min-width: 20px;
`

interface AnswerProps {
  id: string
  index: number
  answer: QuizAnswer
  selectedAnswer: QuestionAnswer[]
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Answer: FC<AnswerProps> = ({ id, onChange, index, answer, selectedAnswer }) => {
  // Convert index to alphabet character to show ABCD before question
  const label = String.fromCharCode(65 + index)
  console.log('selectedAnswer', selectedAnswer)

  return (
    <AnswerStyle
      key={index}
      highlightAnswer={selectedAnswer.some(
        (value) => value.answer === answer._id && value.questionId === id
      )}
    >
      <AnswerLabel>
        <ChoiceLabel>{label}.</ChoiceLabel>
        <SelectionText
          name={answer.description}
          checked={selectedAnswer.some(
            (value) => value.answer === answer._id && value.questionId === id
          )}
          type="radio"
          onChange={onChange}
        />
        {answer.description}
      </AnswerLabel>
    </AnswerStyle>
  )
}

export default Answer
