import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import api from '../../../interceptor/interceptor'

const UserTabContainer = styled.div`
  margin: 20px auto;
  width: 90%;
  overflow-x: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: #fff;
`

const StyledUserTab = styled.table`
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

const UserTabTitle = styled.h2`
  text-align: center;
  color: #333;
  margin: 20px 0;
`

const ActionButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
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
`

const UserTab = () => {
  const [users, setUsers] = useState<any[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.user.getUsers()
        setUsers(response.data.data)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    }

    fetchUsers()
  }, [])

  const handleEdit = (id: string) => {
    // Handle edit action
    console.log(`Засах user with ID: ${id}`)
  }

  const handleDelete = (id: string) => {
    setSelectedUserId(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (selectedUserId) {
      try {
        // await api.user.delete(selectedUserId)
        setUsers(users.filter((user) => user._id !== selectedUserId))
      } catch (error) {
        console.error('Failed to delete user:', error)
      }
      setShowDeleteModal(false)
      setSelectedUserId(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setSelectedUserId(null)
  }

  const handleCreate = () => {
    setShowCreateModal(true)
  }

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUser((prevState) => ({ ...prevState, [name]: value }))
  }

  const confirmCreate = async () => {
    try {
      const response = await api.user.register(newUser)
      setUsers([...users, response.data])
    } catch (error) {
      console.error('Failed to create user:', error)
    }
    setShowCreateModal(false)
    setNewUser({ name: '', email: '', role: '' })
  }

  const cancelCreate = () => {
    setShowCreateModal(false)
    setNewUser({ name: '', email: '', role: '' })
  }

  return (
    <UserTabContainer>
      <UserTabTitle>Хэрэглэгчид</UserTabTitle>
      <StyledUserTab>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </StyledUserTab>

      {showCreateModal && (
        <Modal>
          <ModalContent>
            <h2>Шинээр үүсгэх User</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newUser.name}
              onChange={handleCreateChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleCreateChange}
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={newUser.role}
              onChange={handleCreateChange}
            />
          </ModalContent>
        </Modal>
      )}
    </UserTabContainer>
  )
}

export default UserTab
