import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import api from '../../../interceptor/interceptor'

const CirriculumTabContainer = styled.div`
  margin: 20px auto;
  width: 90%;
  overflow-x: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: #fff;
`

const StyledCirriculumTab = styled.table`
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
    font-size: 14px;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  td {
    font-size: 14px;
    color: #333;
  }
`

const CirriculumTabTitle = styled.h2`
  text-align: center;
  font-size: 24px;
  color: #333;
  margin: 20px 0;
`

const ActionButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  font-size: 14px;
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

const CirriculumTab = () => {
  const [cirriculums, setCirriculums] = useState<any[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedCirriculumId, setSelectedCirriculumId] = useState<string | null>(null)
  const [newCirriculum, setNewCirriculum] = useState({ title: '', description: '' })
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fetchCirriculums = async () => {
      try {
        const response = await api.cirriculum.get()
        setCirriculums(response.data.data)
      } catch (error) {
        console.error('Failed to fetch cirriculums:', error)
      }
    }

    fetchCirriculums()
  }, [])

  const handleEdit = (id: string) => {
    // Handle edit action
    console.log(`Edit cirriculum with ID: ${id}`)
  }

  const handleDelete = (id: string) => {
    setSelectedCirriculumId(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (selectedCirriculumId) {
      try {
        await api.cirriculum.delete(selectedCirriculumId)
        setCirriculums(
          cirriculums.filter((cirriculum) => cirriculum._id !== selectedCirriculumId)
        )
      } catch (error) {
        console.error('Failed to delete cirriculum:', error)
      }
      setShowDeleteModal(false)
      setSelectedCirriculumId(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setSelectedCirriculumId(null)
  }

  const handleCreate = () => {
    setShowCreateModal(true)
  }

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCirriculum((prevState) => ({ ...prevState, [name]: value }))
  }

  const confirmCreate = async () => {
    try {
      const response = await api.cirriculum.create(newCirriculum)
      setCirriculums([...cirriculums, response.data])
    } catch (error) {
      console.error('Failed to create cirriculum:', error)
    }
    setShowCreateModal(false)
    setNewCirriculum({ title: '', description: '' })
  }

  const cancelCreate = () => {
    setShowCreateModal(false)
    setNewCirriculum({ title: '', description: '' })
  }

  const handleEditChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCirriculums((prevState) =>
      prevState.map((cirriculum) =>
        cirriculum._id === id ? { ...cirriculum, [name]: value } : cirriculum
      )
    )
  }

  const saveEdit = async (id: string) => {
    const cirriculumToUpdate = cirriculums.find((cirriculum) => cirriculum._id === id)
    if (cirriculumToUpdate) {
      try {
        await api.cirriculum.update(id, cirriculumToUpdate)
        console.log('Cirriculum updated successfully')
      } catch (error) {
        console.error('Failed to update cirriculum:', error)
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
    <CirriculumTabContainer>
      <CirriculumTabTitle>Сургалтын хөтөлбөрүүд</CirriculumTabTitle>
      <ActionButton onClick={handleCreate}>Create</ActionButton>
      <StyledCirriculumTab>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cirriculums.map((cirriculum) => (
            <React.Fragment key={cirriculum._id}>
              <tr onClick={() => toggleRow(cirriculum._id)}>
                <td>{cirriculum.title}</td>
                <td>{cirriculum.description}</td>
                <td>
                  <ActionButton onClick={() => handleEdit(cirriculum._id)}>
                    Засах
                  </ActionButton>
                  <ActionButton onClick={() => handleDelete(cirriculum._id)}>
                    Устгах
                  </ActionButton>
                </td>
              </tr>
              {expandedRows.has(cirriculum._id) && (
                <CollapsibleContent>
                  <h3>Гарчиг</h3>
                  <input
                    type="text"
                    name="title"
                    value={cirriculum.title}
                    onChange={(e) => handleEditChange(cirriculum._id, e)}
                  />
                  <h3>Тайлбар</h3>
                  <input
                    type="text"
                    name="description"
                    value={cirriculum.description}
                    onChange={(e) => handleEditChange(cirriculum._id, e)}
                  />
                  <ActionButton onClick={() => saveEdit(cirriculum._id)}>
                    Save
                  </ActionButton>
                </CollapsibleContent>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </StyledCirriculumTab>

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
            <h2>Create Cirriculum</h2>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newCirriculum.title}
              onChange={handleCreateChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newCirriculum.description}
              onChange={handleCreateChange}
            />
            <ActionButton onClick={confirmCreate}>Create</ActionButton>
            <ActionButton onClick={cancelCreate}>Cancel</ActionButton>
          </ModalContent>
        </Modal>
      )}
    </CirriculumTabContainer>
  )
}

export default CirriculumTab
