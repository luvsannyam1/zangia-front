import { FC } from 'react'
import styled, { css } from 'styled-components'

import { useQuiz } from '../../context/QuizContext'
import { device } from '../../styles/BreakPoints'
import { Flex, ResizableBox } from '../../styles/Global'
import { refreshPage } from '../../utils/helpers'

import Button from '../ui/Button'
import ResultOverview from './ResultOverview'
import { QuizAnswer } from '../../models'

const ResultScreenContainer = styled.div`
  max-width: 900px;
  margin: 60px auto;
  @media ${device.md} {
    width: 90%;
    margin: 30px auto;
    padding-top: 40px;
  }
`

const InnerContainer = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 4px;
  margin: 0 auto;
  margin-bottom: 40px;
  padding: 40px 90px 90px 90px;
  @media ${device.md} {
    padding: 15px;
  }
`

const QuestionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  @media ${device.md} {
    flex-direction: column;
  }
`

const QuestionNumber = styled.h6`
  font-weight: 500;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.primaryText};
`

const QuestionStyle = styled.span`
  font-weight: 500;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.primaryText};
  margin-bottom: 20px;
  @media ${device.md} {
    margin-bottom: 10px;
  }
`

interface AnswerProps {
  correct?: boolean
  wrong?: boolean
}

const Answer = styled.li<AnswerProps>`
  color: ${({ theme }) => theme.colors.secondaryText};
  font-weight: 400;
  background-color:
  border-radius: 16px;
  margin-top: clamp(13px, calc(10px + 6 * ((100vw - 600px) / 1320)), 16px);
  cursor: pointer;
  @media ${device.md} {
    font-weight: 500;
  }
  input {
    visibility: hidden;
    margin: 0;
  }
  ${({ correct }) =>
    correct &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.themeColor};
    `}

  ${({ wrong }) =>
    wrong &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.danger};
    `}
`

const ResultScreen: FC = () => {
  const { result, resultData } = useQuiz()
  console.log(result)

  const onClickRetry = () => {
    refreshPage()
  }

  return (
    <ResultScreenContainer>
      <InnerContainer>
        <ResultOverview result={resultData} />
        <h3>Асуултууд</h3>
        {result.map(({ question, answers }, index: number) => {
          return (
            <QuestionContainer key={question}>
              <ResizableBox width="90%">
                <Flex gap="4px">
                  <QuestionNumber>{`${index + 1}. `}</QuestionNumber>
                  <QuestionStyle>{question}</QuestionStyle>
                </Flex>
                <div>
                  <ul>
                    {answers.map((value: QuizAnswer, index: number) => {
                      const label = String.fromCharCode(65 + index)
                      return (
                        <Answer key={value._id} correct={false} wrong={false}>
                          <span>{label}.</span>
                          {value.description}
                        </Answer>
                      )
                    })}
                  </ul>
                </div>
              </ResizableBox>
            </QuestionContainer>
          )
        })}
      </InnerContainer>
      <Flex flxEnd>
        <Button text="Дахин оролдох" onClick={onClickRetry} iconPosition="left" bold />
      </Flex>
    </ResultScreenContainer>
  )
}

export default ResultScreen
