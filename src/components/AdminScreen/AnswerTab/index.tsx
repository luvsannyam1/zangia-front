import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import api from '../../../interceptor/interceptor'

const AnswerTabContainer = styled.div`
  margin: 20px auto;
  width: 90%;
  overflow-x: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: #fff;
`

const StyledAnswerTab = styled.table`
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

const AnswerTabTitle = styled.h2`
  text-align: center;
  color: #333;
  margin: 20px 0;
`

const ActionButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  border: 1px solid #007bff;
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
  display: flex;
  flex-direction: column;
  input {
    max-width: 300px;
  }

  button {
    max-width: 300px;
  }

  flex-direction: column;
  * {
    margin: 5px 0;
  }
`
const Subtitle = styled.h3`
  color: black;
`

const AnswerTab = () => {
  const [answers, setAnswers] = useState<any[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null)
  const [newAnswer, setNewAnswer] = useState({ title: '', description: '' })
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await api.answer.get()
        setAnswers(response.data.data)
      } catch (error) {
        console.error('Failed to fetch answers:', error)
      }
    }

    fetchAnswers()
  }, [])

  const handleEdit = (id: string) => {
    // Handle edit action
    console.log(`Edit answer with ID: ${id}`)
  }

  const handleDelete = (id: string) => {
    setSelectedAnswerId(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (selectedAnswerId) {
      try {
        await api.answer.delete(selectedAnswerId)
        setAnswers(answers.filter((answer) => answer._id !== selectedAnswerId))
      } catch (error) {
        console.error('Failed to delete answer:', error)
      }
      setShowDeleteModal(false)
      setSelectedAnswerId(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setSelectedAnswerId(null)
  }

  const handleCreate = () => {
    setShowCreateModal(true)
  }

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewAnswer((prevState) => ({ ...prevState, [name]: value }))
  }

  const confirmCreate = async () => {
    try {
      const response = await api.answer.create(newAnswer)
      setAnswers([...answers, response.data])
    } catch (error) {
      console.error('Failed to create answer:', error)
    }
    setShowCreateModal(false)
    setNewAnswer({ title: '', description: '' })
  }

  const cancelCreate = () => {
    setShowCreateModal(false)
    setNewAnswer({ title: '', description: '' })
  }

  const handleEditChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAnswers((prevState) =>
      prevState.map((answer) =>
        answer._id === id ? { ...answer, [name]: value } : answer
      )
    )
  }

  const saveEdit = async (id: string) => {
    const answerToUpdate = answers.find((answer) => answer._id === id)
    if (answerToUpdate) {
      try {
        await api.answer.update(id, answerToUpdate)
        console.log('Answer updated successfully')
      } catch (error) {
        console.error('Failed to update answer:', error)
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

  return (
    <AnswerTabContainer>
      <AnswerTabTitle>Хариултын сан</AnswerTabTitle>
      <ActionButton onClick={handleCreate}>Create</ActionButton>
      <StyledAnswerTab>
        <thead>
          <tr>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((answer) => (
            <React.Fragment key={answer._id}>
              <tr onClick={() => toggleRow(answer._id)}>
                <td>{answer.description}</td>
                <td>
                  <ActionButton onClick={() => handleEdit(answer._id)}>
                    Засах
                  </ActionButton>
                  <ActionButton onClick={() => handleDelete(answer._id)}>
                    Устгах
                  </ActionButton>
                </td>
              </tr>
              {expandedRows.has(answer._id) && (
                <CollapsibleContent>
                  <Subtitle>Хариулт</Subtitle>
                  <input
                    type="text"
                    name="description"
                    value={answer.description}
                    onChange={(e) => handleEditChange(answer._id, e)}
                  />
                  <ActionButton onClick={() => saveEdit(answer._id)}>Save</ActionButton>
                </CollapsibleContent>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </StyledAnswerTab>

      {showDeleteModal && (
        <Modal>
          <ModalContent>
            <p>Энэ хичээлийг устгахдаа итгэлтэй байна уу?</p>
            <ActionButton onClick={confirmDelete}>Тийм</ActionButton>
            <ActionButton onClick={cancelDelete}>Үгүй</ActionButton>
          </ModalContent>
        </Modal>
      )}

      {showCreateModal && (
        <Modal>
          <ModalContent>
            <Subtitle>Create Answer</Subtitle>

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newAnswer.description}
              onChange={handleCreateChange}
            />
            <ActionButton onClick={confirmCreate}>Create</ActionButton>
            <ActionButton onClick={cancelCreate}>Cancel</ActionButton>
          </ModalContent>
        </Modal>
      )}
    </AnswerTabContainer>
  )
}

export default AnswerTab
