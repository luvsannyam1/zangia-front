import styled from 'styled-components'
import { device } from '../../styles/BreakPoints'
import { useQuiz } from '../../context/QuizContext'
import { ScreenTypes } from '../../types'

import api from '../../interceptor/interceptor'

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.colors.outerBackground};
  @media ${device.md} {
    padding: 15px 20px;
  }
  border: 1px solid #3d444d;
`

const Logo = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
  cursor: pointer;
  color: white;
`

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 30px;
  margin: 0;
  padding: 0;
  color: white;
  @media ${device.md} {
    gap: 15px;
  }
`

const NavLink = styled.li`
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;
  font-size: 0.875rem;

  &:hover {
  }

  @media ${device.md} {
    font-size: 16px;
  }
`

const LogoutButton = styled.button`
  margin-left: 20px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #fff;
  border-radius: 4px;
  background-color: transparent;
  color: white;
  &:hover {
    background-color: #0056b3;
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
      case 'Logout':
        handleLogout()
        break
      default:
        break
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('role')
    localStorage.removeItem('token')
    api.user.logout()
    setCurrentScreen(ScreenTypes.LoginScreen)
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

        <LogoutButton onClick={() => navigateTo('Logout')}>Logout</LogoutButton>
      </NavLinks>
    </NavbarContainer>
  )
}

export default Navbar
