// src/socket.js
import { io } from 'socket.io-client'

const SOCKET_URL = 'http://localhost:8000' // Replace with your server URL
const socket = io(SOCKET_URL, {
  autoConnect: false, // Manual connection
  auth: {
    token: localStorage.getItem('token'), // Send the JWT stored in localStorage
  },
})

export default socket
