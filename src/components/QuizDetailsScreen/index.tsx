import styled from 'styled-components'

import { useQuiz } from '../../context/QuizContext'
import {
  CenterCardContainer,
  LogoContainer,
  HighlightedText,
  PageCenter,
} from '../../styles/Global'
import { ScreenTypes } from '../../types'

import Button from '../ui/Button'
import { convertSeconds } from '../../utils/helpers'

const AppTitle = styled.h2`
  font-weight: 700;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.themeColor};
`

const DetailTextContainer = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
  margin-bottom: 40px;
  text-align: center;
  max-width: 500px;
`

const DetailText = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
  line-height: 1.3;
`

const QuizDetailsScreen = () => {
  const { quizDetail, setCurrentScreen } = useQuiz()

  const { title, testQuestions, duration } = quizDetail

  const goToQuestionScreen = () => {
    setCurrentScreen(ScreenTypes.QuestionScreen)
  }

  return (
    <PageCenter light justifyCenter>
      <CenterCardContainer>
        <LogoContainer></LogoContainer>
        <AppTitle>ZANGIA TEST SUITE</AppTitle>
        <DetailTextContainer>
          <DetailText>
            Өгөх гэж байгаа шалгалт: <HighlightedText>{title}</HighlightedText>
          </DetailText>
          <DetailText>
            Асуултын тоо : <HighlightedText>{testQuestions.length}</HighlightedText>
          </DetailText>
          <DetailText>
            Нийт хугацаа: <HighlightedText>{convertSeconds(duration)}</HighlightedText>
          </DetailText>
        </DetailTextContainer>
        <Button text="Эхлэх" iconPosition="left" onClick={goToQuestionScreen} bold />
      </CenterCardContainer>
    </PageCenter>
  )
}

export default QuizDetailsScreen
