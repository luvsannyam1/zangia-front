import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import api from '../../../interceptor/interceptor'

const TestTabContainer = styled.div`
  margin: 20px auto;
  width: 90%;
  overflow-x: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: #fff;
`

const StyledTestTab = styled.table`
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

const Subtitle = styled.h3`
  color: black;
`

const TestTabTitle = styled.h2`
  text-align: center;
  color: #333;
  margin: 20px 0;
`

const ActionButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  border: 1px solid #007bff;
  border-radius: 4px;
`

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  * {
    margin: 5px 0;
  }
`

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const CollapsibleContent = styled.div`
  padding: 10px;
  background: #f9f9f9;
  border-top: 1px solid #ddd;
  button {
    max-width: 300px;
  }
  flex-direction: column;
  * {
    margin: 5px 0;
  }
`

const TestTab = () => {
  const [tests, setTests] = useState<
    {
      _id: string
      title: string
      description: string
      cirriculumId: string
      testQuestions: string[]
    }[]
  >([])
  const [cirriculums, setCirriculums] = useState<any[]>([])
  const [testQuestions, setQuestions] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null)
  const [newTest, setNewTest] = useState<{
    _id: string
    title: string
    description: string
    cirriculumId: string
    testQuestions: string[]
  }>({
    _id: '',
    title: '',
    description: '',
    cirriculumId: '',
    testQuestions: [],
  })
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await api.test.get()
        setTests(response.data.data)
      } catch (error) {
        console.error('Failed to fetch tests:', error)
      }
    }

    const fetchCirriculums = async () => {
      try {
        const response = await api.cirriculum.get()
        setCirriculums(response.data.data)
      } catch (error) {
        console.error('Failed to fetch cirriculums:', error)
      }
    }

    const fetchtestQuestions = async () => {
      try {
        const response = await api.questionnaire.get()
        setQuestions(response.data.data)
      } catch (error) {
        console.error('Failed to fetch testQuestions:', error)
      }
    }

    fetchTests()
    fetchCirriculums()
    fetchtestQuestions()
  }, [])

  const handleEdit = (id: string) => {
    // Handle edit action
    console.log(`Edit test with ID: ${id}`)
  }

  const handleDelete = (id: string) => {
    setSelectedTestId(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (selectedTestId) {
      try {
        await api.test.delete(selectedTestId)
        setTests(tests.filter((test) => test._id !== selectedTestId))
      } catch (error) {
        console.error('Failed to delete test:', error)
      }
      setShowDeleteModal(false)
      setSelectedTestId(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setSelectedTestId(null)
  }

  const handleCreate = () => {
    setShowCreateModal(true)
  }

  const handleCreateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setNewTest((prevState) => ({ ...prevState, [name]: value }))
  }

  const confirmCreate = async () => {
    try {
      const response = await api.test.create(newTest)
      setTests([...tests, response.data.data])
    } catch (error) {
      alert('Failed to create test:')
    }
    setShowCreateModal(false)
    setNewTest({
      _id: '',
      title: '',
      description: '',
      cirriculumId: '',
      testQuestions: [],
    })
  }

  const cancelCreate = () => {
    setShowCreateModal(false)

    setNewTest({
      _id: '',
      title: '',
      description: '',
      cirriculumId: '',
      testQuestions: [],
    })
  }

  const handleEditChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setTests((prevState) =>
      prevState.map((test) => (test._id === id ? { ...test, [name]: value } : test))
    )
  }

  const saveEdit = async (id: string) => {
    const testToUpdate = tests.find((test) => test._id === id)
    if (testToUpdate) {
      try {
        await api.test.update(id, testToUpdate)
        console.log('Test updated successfully')
      } catch (error) {
        console.error('Failed to update test:', error)
      }
    }
  }

  const toggleRow = (id: string) => {
    setExpandedRows((prevState) => {
      const newExpandedRows = new Set(prevState)
      if (newExpandedRows.has(id)) {
        newExpandedRows.delete(id)
      } else {
        newExpandedRows.add(id)
      }
      return newExpandedRows
    })
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const toggleQuestion = (testId: string, questionId: string) => {
    setTests((prevState) =>
      prevState.map((test) =>
        test._id === testId
          ? {
              ...test,
              testQuestions: test?.testQuestions?.includes(questionId)
                ? test.testQuestions.filter((q: any) => q !== questionId)
                : [...test.testQuestions, questionId],
            }
          : test
      )
    )
  }

  const toggleQuestionCreation = (testId: string, questionId: string) => {
    setNewTest((test) => {
      return {
        ...test,
        testQuestions: test?.testQuestions?.includes(questionId)
          ? test.testQuestions.filter((q: any) => q !== questionId)
          : [...test.testQuestions, questionId],
      }
    })
  }

  const filteredtestQuestions = testQuestions.filter((question: any) =>
    question.question.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <TestTabContainer>
      <TestTabTitle>Хичээлүүд</TestTabTitle>
      <ActionButton onClick={handleCreate}>Create</ActionButton>
      <StyledTestTab>
        <thead>
          <tr>
            <th>Гарчиг</th>
            <th>Тайлбар</th>
            <th>Үйлдлүүд</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => (
            <React.Fragment key={test._id}>
              <tr onClick={() => toggleRow(test._id)}>
                <td>{test.title}</td>
                <td>{test.description}</td>
                <td>
                  <ActionButton onClick={() => handleEdit(test._id)}>Засах</ActionButton>
                  <ActionButton onClick={() => handleDelete(test._id)}>
                    Устгах
                  </ActionButton>
                </td>
              </tr>
              {expandedRows.has(test._id) && (
                <tr>
                  <td colSpan={3}>
                    <CollapsibleContent>
                      <Subtitle>Гарчиг</Subtitle>
                      <input
                        type="text"
                        name="title"
                        value={test.title}
                        onChange={(e) => handleEditChange(test._id, e)}
                      />
                      <Subtitle>Тайлбар</Subtitle>
                      <input
                        type="text"
                        name="description"
                        value={test.description}
                        onChange={(e) => handleEditChange(test._id, e)}
                      />
                      <Subtitle>Хичээл</Subtitle>
                      <select
                        name="cirriculumId"
                        value={test.cirriculumId}
                        onChange={(e) => handleEditChange(test._id, e)}
                      >
                        <option value="">Select Cirriculum</option>
                        {cirriculums.map((cirriculum) => (
                          <option key={cirriculum._id} value={cirriculum._id}>
                            {cirriculum.title}
                          </option>
                        ))}
                      </select>
                      <Subtitle>Асуултууд</Subtitle>
                      <input
                        type="text"
                        placeholder="Асуултаа хайх"
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                      <table>
                        <thead>
                          <tr>
                            <th>Гарчиг</th>
                            <th>Үйлдлүүд</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredtestQuestions.map((question: any) => (
                            <tr key={question._id}>
                              <td>{question.question}</td>
                              <td>
                                <ActionButton
                                  onClick={() => toggleQuestion(test._id, question._id)}
                                >
                                  {test.testQuestions?.includes(question._id)
                                    ? 'Хасах'
                                    : 'Нэмэх'}
                                </ActionButton>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <ActionButton onClick={() => saveEdit(test._id)}>
                        Хадгалах
                      </ActionButton>
                    </CollapsibleContent>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </StyledTestTab>

      {showDeleteModal && (
        <Modal>
          <ModalContent>
            <p>Are you sure you want to delete this test?</p>
            <ActionButton onClick={confirmDelete}>Тийм</ActionButton>
            <ActionButton onClick={cancelDelete}>Үгүй</ActionButton>
          </ModalContent>
        </Modal>
      )}

      {showCreateModal && (
        <Modal>
          <ModalContent>
            <h2>Create Test</h2>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newTest.title}
              onChange={handleCreateChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newTest.description}
              onChange={handleCreateChange}
            />
            <select
              name="cirriculumId"
              value={newTest.cirriculumId}
              onChange={handleCreateChange}
            >
              <option value="">Select Cirriculum</option>
              {cirriculums.map((cirriculum) => (
                <option key={cirriculum._id} value={cirriculum._id}>
                  {cirriculum.title}
                </option>
              ))}
            </select>
            <Subtitle>Асуултууд</Subtitle>
            <input
              type="text"
              placeholder="Асуултаа хайх"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <table>
              <thead>
                <tr>
                  <th>Гарчиг</th>
                  <th>Үйлдлүүд</th>
                </tr>
              </thead>
              <tbody>
                {filteredtestQuestions.map((question: any) => (
                  <tr key={question._id}>
                    <td>{question.question}</td>
                    <td>
                      <ActionButton
                        onClick={() => toggleQuestionCreation(newTest._id, question._id)}
                      >
                        {newTest.testQuestions?.includes(question._id)
                          ? 'Хасах'
                          : 'Нэмэх'}
                      </ActionButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ActionButton onClick={confirmCreate}>Create</ActionButton>
            <ActionButton onClick={cancelCreate}>Cancel</ActionButton>
          </ModalContent>
        </Modal>
      )}
    </TestTabContainer>
  )
}

export default TestTab
