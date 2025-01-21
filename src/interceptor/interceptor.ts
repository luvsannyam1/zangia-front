import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/server',
  headers: {
    'Content-Type': 'application/json',
  },
})

let token = localStorage.getItem('token') // Or any other secure storage

apiClient.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        await apiClient.get('/user/logout')
        localStorage.removeItem('token')
        window.location.href = '/login'
      } catch (logoutError) {
        return Promise.reject(logoutError)
      }
    }

    return Promise.reject(error)
  }
)

const api = {
  user: {
    register: (data: any) => apiClient.post('/user/register', data),
    login: (data: any) => apiClient.post('/user/login', data),
    getMe: () => apiClient.get('/user/me'),
    getUsers: () => apiClient.get('/user/users'),
    logout: () => apiClient.get('/user/logout'),
    updateUserDetail: (data: any) => apiClient.put('/user/me', data),
    updatePassword: (data: any) => apiClient.put('/user/updatepassword', data),
  },
  answer: {
    create: (data: any) => apiClient.post('/answer', data),
    update: (id: string, data: any) => apiClient.put(`/answer/${id}`, data),
    get: () => apiClient.get('/answer'),
    delete: (id: string) => apiClient.delete(`/answer/${id}`),
  },
  questionnaire: {
    create: (data: any) => apiClient.post('/questionnaire', data),
    update: (id: string, data: any) => apiClient.put(`/questionnaire/${id}`, data),
    get: () => apiClient.get('/questionnaire'),
    delete: (id: string) => apiClient.delete(`/questionnaire/${id}`),
  },
  test: {
    create: (data: any) => apiClient.post('/test', data),
    update: (id: string, data: any) => apiClient.put(`/test/${id}`, data),
    get: () => apiClient.get('/test'),
    delete: (id: string) => apiClient.delete(`/test/${id}`),
    getByCirriculum: (id: string) => apiClient.get(`/test/cirriculum/${id}`),
  },

  cirriculum: {
    create: (data: any) => apiClient.post('/cirriculum', data),
    update: (id: string, data: any) => apiClient.put(`/cirriculum/${id}`, data),
    get: () => apiClient.get('/cirriculum'),
    delete: (id: string) => apiClient.delete(`/cirriculum/${id}`),
  },
  exam: {
    get: () => apiClient.get('/exam/'),
  },
  uploadImage: (formData: any) =>
    apiClient.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
}

export default api
