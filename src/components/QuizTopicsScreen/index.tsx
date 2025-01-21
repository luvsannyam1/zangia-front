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
  color: white;
`

const DetailText = styled.p`
  font-weight: 500;
  line-height: 29px;
  text-align: center;
  color: white;
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

const QuizTopicsScreen: React.FC = () => {
  const { quizTopic, selectQuizTopic, setCurrentScreen } = useQuiz()
  const [cirriculum, setCirriculum] = useState<any[]>([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.cirriculum.get() // API call
        setCirriculum(response.data.data) // Set user data in state
      } catch (err) {
        alert(err)
      }
    }

    fetchUser()
  }, [])
  const goToQuizDetailsScreen = () => {
    if (quizTopic !== '') setCurrentScreen(ScreenTypes.QuizsScreen)
  }

  return (
    <PageCenter light justifyCenter>
      <CenterCardContainer>
        <LogoContainer></LogoContainer>
        <Heading>
          WELCOME TO <HighlightedText> ZANGIA TEST SUITE</HighlightedText>
        </Heading>
        <DetailText>Шалгалт өгөх хичээлээ сонгоно уу</DetailText>
        <SelectButtonContainer>
          {cirriculum?.map(({ _id, title, image }) => (
            <SelectButton
              key={title}
              active={quizTopic === _id}
              onClick={() => selectQuizTopic(_id)}
            >
              <img src={image} alt="" />
              <SelectButtonText>{title}</SelectButtonText>
            </SelectButton>
          ))}
        </SelectButtonContainer>
        <Button text="Үргэлжлүүлэх" onClick={goToQuizDetailsScreen} bold />
      </CenterCardContainer>
    </PageCenter>
  )
}

export default QuizTopicsScreen
