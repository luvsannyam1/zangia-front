import styled from 'styled-components'

import { useQuiz } from '../../context/QuizContext'
import { device } from '../../styles/BreakPoints'
import {
  CenterCardContainer,
  HighlightedText,
  LogoContainer,
  PageCenter,
  SelectButton,
} from '../../styles/Global'
import { ScreenTypes } from '../../types'
import api from '../../interceptor/interceptor'

import Button from '../ui/Button'
import { useEffect, useState } from 'react'

const Heading = styled.h2`
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
`

const DetailText = styled.p`
  font-weight: 500;
  line-height: 29px;
  text-align: center;
`

const SelectButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 60%;
  gap: 30px;
  margin-top: 40px;
  margin-bottom: 45px;
  @media ${device.md} {
    row-gap: 20px;
    column-gap: 20px;
    max-width: 100%;
  }
`

const SelectButtonText = styled.span`
  font-weight: 600;
  margin-left: 10px;
  @media ${device.md} {
    font-weight: 500;
  }
`

const QuizsScreen: React.FC = () => {
  const { quizTopic, quizDetail, setQuizDetail, setCurrentScreen } = useQuiz()
  const [quiz, setQuiz] = useState<any[]>([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.test.getByCirriculum(quizTopic) // API call
        setQuiz(response.data.data) // Set user data in state
      } catch (err) {
        alert(err)
      }
    }

    fetchUser() // Call the async function
  }, [quizTopic])

  const goToQuizDetailsScreen = () => {
    if (quizDetail) setCurrentScreen(ScreenTypes.QuizDetailsScreen)
  }

  return (
    <PageCenter light justifyCenter>
      <CenterCardContainer>
        <LogoContainer></LogoContainer>
        <Heading>
          SELECT <HighlightedText> YOUR QUIZ</HighlightedText>
        </Heading>
        <DetailText>Өгөх шалгалтаа сонгоно уу</DetailText>
        <SelectButtonContainer>
          {quiz?.map((quizData) => {
            console.log(quizData)
            return (
              <SelectButton
                key={quizData.title}
                active={quizDetail?._id === quizData._id}
                onClick={() => setQuizDetail(quizData)}
              >
                <img src={quizData.image} alt="" />
                <SelectButtonText>{quizData.title}</SelectButtonText>
              </SelectButton>
            )
          })}
        </SelectButtonContainer>
        <Button text="Үргэлжлүүлэх" onClick={goToQuizDetailsScreen} bold />
      </CenterCardContainer>
    </PageCenter>
  )
}

export default QuizsScreen
