import { FC } from 'react'
import styled from 'styled-components'

import { useQuiz } from '../../../context/QuizContext'
import { device } from '../../../styles/BreakPoints'
import { HighlightedText } from '../../../styles/Global'
import { convertSeconds } from '../../../utils/helpers'
import { Result } from '../../../types'

const ResultOverviewStyle = styled.div`
  text-align: center;
  margin-bottom: 70px;
  @media ${device.md} {
    margin-bottom: 30px;
  }
  p {
    margin-top: 15px;
    font-weight: 500;
    font-size: 18px;
  }
`

interface ResultOverviewProps {
  result: Result[]
}

const ResultOverview: FC<ResultOverviewProps> = ({ result }) => {
  // const { quizDetails, endTime } = useQuiz()
  const { endTime } = useQuiz()

  const totalQuestionAttempted = result.length

  const obtainedScore = result
    .filter((item) => item.isMatch && typeof item.score === 'number')
    .reduce((accumulator, currentValue) => accumulator + (currentValue.score || 0), 0)

  // Passed if 60 or more than 60% marks
  // const calculateStatus =
  //   (obtainedScore / quizDetails.totalScore) * 100 >= 60 ? 'Тэнцсэн' : 'Унасан'

  return (
    <ResultOverviewStyle>
      <p>
        Таны хариулсан асуултууд:{' '}
        <HighlightedText> {totalQuestionAttempted} </HighlightedText>/{' '}
        {/* {quizDetails.totalQuestions} */}
      </p>
      <p>
        Таны авсан оноо:<HighlightedText> {obtainedScore} </HighlightedText>/{' '}
        {/* {quizDetails.totalScore} */}
      </p>
      <p>
        Зарцуулсан хугацаа:<HighlightedText> {convertSeconds(endTime)} </HighlightedText>
      </p>
      <p>{/* Дүн:<HighlightedText> {calculateStatus}</HighlightedText> */}</p>
    </ResultOverviewStyle>
  )
}

export default ResultOverview
