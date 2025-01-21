import styled from 'styled-components'
import { useState } from 'react'
import UserTab from './UserTab'
import CirriculumTab from './CirriculumTab'
import TestTab from './TestTab'
import QuestionnaireTab from './QuestionsTab'
import AnswerTab from './AnswerTab'
import ExamTab from './Exams'

const AdminPage = styled.div`
  font-family: Arial, sans-serif;
  align-items: center;
  justify-content: center;
  padding: 20px;
`

const CenterCardContainer = styled.div`
  border-radius: 4px;
  width: 100%;
  height: 100%
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

const AppTitle = styled.h2`
  text-align: center;
  margin: 20px 0;
`

const TabContainer = styled.div`
  overflow: hidden;
  border: 1px solid #ccc;
`

const TabButton = styled.button<{ active: boolean }>`
  background-color: ${({ active }) => (active ? '#ccc' : 'inherit')};
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: background-color 0.3s;

  color: ${({ theme }) => theme.colors.themeColor};

  &:hover {
    background-color: #ddd;
  }
`

const TabContent = styled.div`
  display: ${({ active }: { active: boolean }) => (active ? 'block' : 'none')};
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-top: none;
`

type Tab = {
  label: string
  content: React.ReactNode
}

const AdminScreen = () => {
  const [activeTab, setActiveTab] = useState(0)

  const tabs: Tab[] = [
    { label: 'Хэрэглэгчийн тохиргоо', content: <UserTab /> },
    { label: 'Хичээлүүд', content: <CirriculumTab /> },
    { label: 'Шалгалтууд', content: <TestTab /> },
    { label: 'Асуултын сан', content: <QuestionnaireTab /> },
    { label: 'Хариултын сан', content: <AnswerTab /> },
    { label: 'Дүнгийн жагсаалт', content: <ExamTab /> },
  ]

  return (
    <AdminPage>
      <CenterCardContainer>
        <AppTitle>Admin Panel</AppTitle>
        <TabContainer>
          {tabs.map((tab, index) => (
            <TabButton
              key={index}
              active={index === activeTab}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </TabButton>
          ))}
        </TabContainer>
        {tabs.map((tab, index) => (
          <TabContent key={index} active={index === activeTab}>
            {tab.content}
          </TabContent>
        ))}
      </CenterCardContainer>
    </AdminPage>
  )
}

export default AdminScreen
