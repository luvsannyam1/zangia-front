import { FC } from 'react'
import styled from 'styled-components'

import { device } from '../../../styles/BreakPoints'
import { HighlightedText } from '../../../styles/Global'

const ResultOverviewStyle = styled.div`
  text-align: center;
  margin-bottom: 70px;
  @media ${device.md} {
    margin-bottom: 30px;
  }
  p {
    margin-top: 15px;
    font-weight: 500;
  }
`

interface ResultOverviewProps {
  result: any
}

const ResultOverview: FC<ResultOverviewProps> = ({ result }) => {
  console.log(result)

  const { totalQuestions, score, percentage } = result

  return (
    <ResultOverviewStyle>
      <p>
        Таны хариулсан асуултууд: <HighlightedText> {totalQuestions} </HighlightedText>/{' '}
      </p>
      <p>
        Таны авсан оноо:<HighlightedText> {score} </HighlightedText>/{totalQuestions}
      </p>

      <p>
        Таны авсан дүн:<HighlightedText> {percentage} </HighlightedText>/{'100 '}
      </p>
    </ResultOverviewStyle>
  )
}

export default ResultOverview
