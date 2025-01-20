import styled from 'styled-components'
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

const InputContainer = styled.div`
  margin-top: 15px;
  max-width: 500px;
  text-align: left;
  display: flex;
  flex-direction: column;
`

const LabelText = styled(HighlightedText)`
  margin-bottom: 5px;
`

const StyledInput = styled.input`
  font-size: 20px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
`

const RegisterScreen = () => {
  const { setCurrentScreen } = useQuiz()
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    birthday: '',
    photoURL: '',
    password: '',
    role: 'user',
  })

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value })
  }

  const handleRegister = async () => {
    try {
      await api.user.register(formData)
      alert('Registration successful! Please log in.')
      setCurrentScreen(ScreenTypes.LoginScreen)
    } catch (error) {
      alert('Registration failed. Please try again.')
    }
  }

  return (
    <PageCenter light justifyCenter>
      <CenterCardContainer>
        <LogoContainer />
        <AppTitle>Register for ZANGIA</AppTitle>

        <InputContainer>
          <LabelText>First Name</LabelText>
          <StyledInput
            type="text"
            value={formData.name}
            onChange={handleChange('name')}
          />
        </InputContainer>

        <InputContainer>
          <LabelText>Last Name</LabelText>
          <StyledInput
            type="text"
            value={formData.lastName}
            onChange={handleChange('lastName')}
          />
        </InputContainer>

        <InputContainer>
          <LabelText>Email</LabelText>
          <StyledInput
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
          />
        </InputContainer>

        <InputContainer>
          <LabelText>Phone</LabelText>
          <StyledInput
            type="text"
            value={formData.phone}
            onChange={handleChange('phone')}
          />
        </InputContainer>

        <InputContainer>
          <LabelText>Address</LabelText>
          <StyledInput
            type="text"
            value={formData.address}
            onChange={handleChange('address')}
          />
        </InputContainer>

        <InputContainer>
          <LabelText>Birthday</LabelText>
          <StyledInput
            type="date"
            value={formData.birthday}
            onChange={handleChange('birthday')}
          />
        </InputContainer>

        <InputContainer>
          <LabelText>Password</LabelText>
          <StyledInput
            type="password"
            value={formData.password}
            onChange={handleChange('password')}
          />
        </InputContainer>

        <ButtonGroup>
          <Button text="Register" iconPosition="left" onClick={handleRegister} bold />
        </ButtonGroup>
      </CenterCardContainer>
    </PageCenter>
  )
}

export default RegisterScreen
