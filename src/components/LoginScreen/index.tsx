import styled from 'styled-components'

import { StartIcon } from '../../config/icons'
import { useQuiz } from '../../context/QuizContext'
import api from '../../interceptor/interceptor'
import {
  CenterCardContainer,
  HighlightedText,
  LogoContainer,
  PageCenter,
} from '../../styles/Global'
import { ScreenTypes } from '../../types'

import Button from '../ui/Button'
import { useState } from 'react'

const AppTitle = styled.h2`
  font-weight: 700;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.themeColor};
`

const DetailTextContainer = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
  text-align: left;
  max-width: 500px;
  display: flex;
  flex-direction: column;
`

const DetailText = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
  line-height: 1.3;
  justify-content: center;
  display: flex;
  flex-direction: column;
`
const StyledInput = styled.input`
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
  line-height: 1.3;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 400px;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`
const ButtonGroup = styled.div`
  width: 600px;
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
`

const LoginScreen = () => {
  const { setCurrentScreen } = useQuiz()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const goToQuestionScreen = () => {
    setCurrentScreen(ScreenTypes.QuizTopicsScreen)
  }

  const goToRegisterScreen = () => {
    setCurrentScreen(ScreenTypes.RegisterScreen)
  }

  const handleSubmit = async () => {
    try {
      const response = await api.user.login({
        email,
        password,
      })

      localStorage.setItem('token', response.data.access_token)

      goToQuestionScreen()
    } catch (error) {
      alert('Invalid email or password')
    }
  }
  const handleRegister = () => {
    goToRegisterScreen()
  }

  return (
    <PageCenter light justifyCenter>
      <CenterCardContainer>
        <LogoContainer></LogoContainer>
        <AppTitle>ZANGIA TEST SUITE</AppTitle>
        <DetailTextContainer>
          <DetailText>
            <HighlightedText>Нэвтрэх нэр</HighlightedText>
            <StyledInput type="text" onChange={(e) => setEmail(e.target.value)} />
          </DetailText>
        </DetailTextContainer>

        <DetailTextContainer>
          <DetailText>
            <HighlightedText>Нууц үг</HighlightedText>
            <StyledInput type="password" onChange={(e) => setPassword(e.target.value)} />
          </DetailText>
        </DetailTextContainer>

        <ButtonGroup>
          <Button
            text="Нэвтрэх "
            icon={<StartIcon />}
            iconPosition="left"
            onClick={handleSubmit}
            bold
          />

          <Button
            text="Бүртгүүлэх"
            icon={<StartIcon />}
            iconPosition="left"
            onClick={handleRegister}
            bold
          />
        </ButtonGroup>
      </CenterCardContainer>
    </PageCenter>
  )
}

export default LoginScreen
