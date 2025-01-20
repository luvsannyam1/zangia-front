import styled from 'styled-components'
import { device } from '../../styles/BreakPoints'
import { useQuiz } from '../../context/QuizContext'
import { ScreenTypes } from '../../types'

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  @media ${device.md} {
    padding: 15px 20px;
  }
`

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 30px;
  margin: 0;
  padding: 0;
  @media ${device.md} {
    gap: 15px;
  }
`

const NavLink = styled.li`
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
  }

  @media ${device.md} {
    font-size: 16px;
  }
`

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { setCurrentScreen } = useQuiz()
  const role = localStorage.getItem('role') as 'admin' | 'user' | null

  const navigateTo = (screen: string): void => {
    switch (screen) {
      case 'HomeScreen':
        setCurrentScreen(ScreenTypes.LoginScreen)
        break
      case 'QuizScreen':
        setCurrentScreen(ScreenTypes.QuizTopicsScreen)
        break
      case 'AdminPanel':
        setCurrentScreen(ScreenTypes.AdminScreen)
        break

      default:
        break
    }
  }

  if (role !== 'admin' && role !== 'user') {
    return null // Hide navbar if the role is not admin or user
  }

  return (
    <NavbarContainer>
      <Logo onClick={() => navigateTo('HomeScreen')}>Zangia TEST SUITE</Logo>
      <NavLinks>
        <NavLink onClick={() => navigateTo('HomeScreen')}>Home</NavLink>
        <NavLink onClick={() => navigateTo('QuizScreen')}>Quizzes</NavLink>
        {role === 'admin' && (
          <NavLink onClick={() => navigateTo('AdminPanel')}>Admin Panel</NavLink>
        )}
      </NavLinks>
    </NavbarContainer>
  )
}

export default Navbar
