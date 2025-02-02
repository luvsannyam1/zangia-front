import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import api from '../../../interceptor/interceptor'
import FileUploader from '../../ui/FileUploader'
import QuizImage from '../../ui/QuizImage'

const QuestionsTabContainer = styled.div`
  margin: 20px auto;
  width: 90%;
  overflow-x: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: #fff;
`

const StyledQuestionsTab = styled.table`
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

const QuestionsTabTitle = styled.h2`
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

const CollapsibleContent = styled.div`
  padding: 10px;
  background: #f9f9f9;
  border-top: 1px solid #ddd;
`

const QuestionsTab = () => {
  const [questionnaires, setQuestionnaires] = useState<any[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedQuestionnaireId, setSelectedQuestionnaireId] = useState<string | null>(
    null
  )
  const [newQuestionnaire, setNewQuestionnaire] = useState<{
    _id: string
    question: string
    description: string
    answers: string[]
  }>({
    _id: '',
    question: '',
    description: '',
    answers: [],
  })
  const [answers, setAnswers] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fetchQuestionnaires = async () => {
      try {
        const response = await api.questionnaire.get()
        setQuestionnaires(response.data.data)
      } catch (error) {
        console.error('Failed to fetch questionnaires:', error)
      }
    }

    const fetchAnswers = async () => {
      try {
        const response = await api.answer.get()
        setAnswers(response.data.data)
      } catch (error) {
        console.error('Failed to fetch answers:', error)
      }
    }

    fetchQuestionnaires()
    fetchAnswers()
  }, [])

  const handleEdit = (id: string) => {
    // Handle edit action
    console.log(`Edit questionnaire with ID: ${id}`)
  }

  const handleDelete = (id: string) => {
    setSelectedQuestionnaireId(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (selectedQuestionnaireId) {
      try {
        await api.questionnaire.delete(selectedQuestionnaireId)
        setQuestionnaires(
          questionnaires.filter(
            (questionnaire) => questionnaire._id !== selectedQuestionnaireId
          )
        )
      } catch (error) {
        console.error('Failed to delete questionnaire:', error)
      }
      setShowDeleteModal(false)
      setSelectedQuestionnaireId(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setSelectedQuestionnaireId(null)
  }

  const handleCreate = () => {
    setShowCreateModal(true)
  }

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewQuestionnaire((prevState) => ({ ...prevState, [name]: value }))
  }

  const confirmCreate = async () => {
    try {
      const response = await api.questionnaire.create(newQuestionnaire)
      setQuestionnaires([...questionnaires, response.data])
    } catch (error) {
      console.error('Failed to create questionnaire:', error)
    }
    setShowCreateModal(false)
    setNewQuestionnaire({ _id: '', question: '', description: '', answers: [] })
  }

  const cancelCreate = () => {
    setShowCreateModal(false)
    setNewQuestionnaire({ _id: '', question: '', description: '', answers: [] })
  }

  const handleEditChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setQuestionnaires((prevState) =>
      prevState.map((questionnaire) =>
        questionnaire._id === id ? { ...questionnaire, [name]: value } : questionnaire
      )
    )
  }

  const saveEdit = async (id: string) => {
    const questionnaireToUpdate = questionnaires.find(
      (questionnaire) => questionnaire._id === id
    )
    if (questionnaireToUpdate) {
      try {
        await api.questionnaire.update(id, questionnaireToUpdate)
        console.log('Questionnaire updated successfully')
      } catch (error) {
        console.error('Failed to update questionnaire:', error)
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

  const toggleAsnwerCreation = (answerId: string) => {
    setNewQuestionnaire((test) => {
      return {
        ...test,
        answers: test.answers?.includes(answerId)
          ? test.answers.filter((q: string) => q !== answerId)
          : [...test.answers, answerId],
      }
    })
  }

  const toggleAnswer = (questionnaireId: string, answerId: string) => {
    setQuestionnaires((prevState) =>
      prevState.map((questionnaire) =>
        questionnaire._id === questionnaireId && questionnaire.answers.length <= 5
          ? {
              ...questionnaire,
              answers: questionnaire.answers.includes(answerId)
                ? questionnaire.answers.filter((a: any) => a !== answerId)
                : [...questionnaire.answers, answerId],
            }
          : questionnaire
      )
    )
  }

  const toggleImages = (questionnaireId: string, imageUrl: string) => {
    setQuestionnaires((prevState) =>
      prevState.map((questionnaire) =>
        questionnaire._id === questionnaireId
          ? {
              ...questionnaire,
              imgUrls: questionnaire.imgUrls.includes(imageUrl)
                ? questionnaire.imgUrls.filter((a: any) => a !== imageUrl)
                : [...questionnaire.imgUrls, imageUrl],
            }
          : questionnaire
      )
    )
  }

  const filteredAnswers = answers.filter((answer: any) =>
    answer.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <QuestionsTabContainer>
      <QuestionsTabTitle>Асуултууд</QuestionsTabTitle>
      <ActionButton onClick={handleCreate}>Create</ActionButton>
      <StyledQuestionsTab>
        <thead>
          <tr>
            <th>Асуулт</th>
            <th>Үйлдлүүд</th>
          </tr>
        </thead>
        <tbody>
          {questionnaires.map((questionnaire) => (
            <React.Fragment key={questionnaire._id}>
              <tr onClick={() => toggleRow(questionnaire._id)}>
                <td>{questionnaire.question}</td>
                <td>
                  <ActionButton onClick={() => handleEdit(questionnaire._id)}>
                    Засах
                  </ActionButton>
                  <ActionButton onClick={() => handleDelete(questionnaire._id)}>
                    Устгах
                  </ActionButton>
                </td>
              </tr>
              {expandedRows.has(questionnaire._id) && (
                <tr>
                  <td colSpan={3}>
                    <CollapsibleContent>
                      <Subtitle>Асуулт</Subtitle>
                      <input
                        type="text"
                        name="question"
                        value={questionnaire.question}
                        onChange={(e) => handleEditChange(questionnaire._id, e)}
                      />
                      <Subtitle>Зураг болон бичлэг</Subtitle>
                      <FileUploader
                        onUploadSuccess={(url) => {
                          toggleImages(questionnaire._id, url)
                        }}
                      />

                      {questionnaire.imgUrls?.length !== 0 &&
                        questionnaire.imgUrls.map((url: any, index: number) => (
                          <div
                            onClick={() => toggleImages(questionnaire._id, url)}
                            key={index}
                          >
                            <QuizImage key={index} image={url} />
                          </div>
                        ))}
                      <Subtitle>Хариултууд</Subtitle>
                      <input
                        type="text"
                        placeholder="Search answers"
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                      <table>
                        <thead>
                          <tr>
                            <th>Хариулт</th>
                            <th>Үйлдлүүд</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredAnswers.map((answer) => (
                            <tr key={answer._id}>
                              <td>{answer.description}</td>
                              <td>
                                <ActionButton
                                  onClick={() =>
                                    toggleAnswer(questionnaire._id, answer._id)
                                  }
                                >
                                  {questionnaire.answers.includes(answer._id)
                                    ? 'Хасах'
                                    : 'Нэмэх'}
                                </ActionButton>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <ActionButton onClick={() => saveEdit(questionnaire._id)}>
                        Хадгалах
                      </ActionButton>
                    </CollapsibleContent>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </StyledQuestionsTab>

      {showDeleteModal && (
        <Modal>
          <ModalContent>
            <p>Энэ асуултыг устгахдаа итгэлтэй байна уу?</p>
            <ActionButton onClick={confirmDelete}>Тийм</ActionButton>
            <ActionButton onClick={cancelDelete}>Үгүй</ActionButton>
          </ModalContent>
        </Modal>
      )}

      {showCreateModal && (
        <Modal>
          <ModalContent>
            <Subtitle>Create Questionnaire</Subtitle>
            <input
              type="text"
              name="question"
              placeholder="Question"
              value={newQuestionnaire.question}
              onChange={handleCreateChange}
            />
            <Subtitle>Хариултууд</Subtitle>
            <input
              type="text"
              placeholder="Search answers"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <table>
              <thead>
                <tr>
                  <th>Хариулт</th>
                  <th>Үйлдлүүд</th>
                </tr>
              </thead>
              <tbody>
                {filteredAnswers.map((answer) => (
                  <tr key={answer._id}>
                    <td>{answer.description}</td>
                    <td>
                      <ActionButton onClick={() => toggleAsnwerCreation(answer._id)}>
                        {newQuestionnaire.answers.includes(answer._id)
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
    </QuestionsTabContainer>
  )
}

export default QuestionsTab
