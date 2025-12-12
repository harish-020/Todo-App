import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

export const signup = (email, password) => {
  return api.post('/signup', { email, password })
}

export const signin = (email, password) => {
  return api.post('/signin', { email, password })
}

export const addTodo = (title, description) => {
  return api.post('/add', { title, description })
}

export const getTodos = () => {
  return api.get('/get')
}

export const deleteTodo = (todoId) => {
  return api.delete('/delete', { data: { todoId } })
}

export default api
