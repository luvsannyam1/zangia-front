import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import api from '../../../interceptor/interceptor'

const ExamTabContainer = styled.div`
  margin: 20px auto;
  width: 90%;
  overflow-x: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: #fff;
`

const StyledExamTab = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;

  th,
  td {
    padding: 12px 15px;
    text-align: left;
    border: 1px solid #ddd;
  }

  th {
    background-color: #007bff;
    color: white;
    text-transform: uppercase;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  td {
    color: #333;
  }
`

const ExamTabTitle = styled.h2`
  text-align: center;
  color: #333;
  margin: 20px 0;
`

const ExamTab = () => {
  const [answers, setExams] = useState<any[]>([])

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await api.exam.get()
        setExams(response.data.data)
        console.log(response.data.data)
      } catch (error) {
        console.error('Failed to fetch answers:', error)
      }
    }

    fetchExams()
  }, [])

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString))
  }
  return (
    <ExamTabContainer>
      <ExamTabTitle>Дүнгийн жагсаалт</ExamTabTitle>
      <StyledExamTab>
        <thead>
          <tr>
            <th>Өгсөн шалгалт</th>
            <th>Шалгалт өгсөн хэрэглэгч </th>
            <th>Авсан дүн</th>
            <th>Шалгалт өгсөн огноо</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((exam) => (
            <React.Fragment key={exam._id}>
              <tr>
                <td>{exam?.test?.title}</td>
                <td>{exam?.user?.name}</td>
                <td>{exam?.evaluation}</td>
                <td>{formatDate(exam?.date)}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </StyledExamTab>
    </ExamTabContainer>
  )
}

export default ExamTab
