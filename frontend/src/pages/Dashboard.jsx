import { useState, useEffect } from 'react'
import { addTodo, getTodos, deleteTodo } from '../api/api'

function Dashboard({ setIsAuthenticated }) {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await getTodos()
      setTodos(response.data)
      setError('')
    } catch (err) {
      setError('Failed to load todos. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddTodo = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!title.trim()) {
      setError('Please enter a todo title')
      return
    }

    try {
      setSubmitting(true)
      const response = await addTodo(title, description)
      setTodos([...todos, response.data])
      setTitle('')
      setDescription('')
      setSuccess('Todo added successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add todo. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteTodo = async (todoId) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) {
      return
    }

    try {
      await deleteTodo(todoId)
      setTodos(todos.filter((todo) => todo.id !== todoId))
      setSuccess('Todo deleted successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete todo. Please try again.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
  }

  return (
    <div className="container">
      <div className="user-info">
        <div>
          <p className="user-email">{user?.email || 'User'}</p>
        </div>
        <button className="btn-primary logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h1>My Todos</h1>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form className="add-todo-form" onSubmit={handleAddTodo}>
        <div className="form-group">
          <label htmlFor="title">Todo Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What do you need to do?"
            disabled={submitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details... (optional)"
            disabled={submitting}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={submitting || loading}>
          {submitting ? 'Adding...' : 'Add Todo'}
        </button>
      </form>

      {loading ? (
        <div className="loading">Loading your todos...</div>
      ) : todos.length === 0 ? (
        <div className="empty-state">
          <p>No todos yet. Create one to get started! 🚀</p>
        </div>
      ) : (
        <div className="todo-list">
          {todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              <div className="todo-content">
                <div className="todo-title">{todo.title}</div>
                {todo.description && (
                  <div className="todo-description">{todo.description}</div>
                )}
              </div>
              <div className="todo-actions">
                <button
                  className="btn-danger btn-small"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard
