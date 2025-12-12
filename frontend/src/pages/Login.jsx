import { useState } from 'react'
import { signup, signin } from '../api/api'

function Login({ setIsAuthenticated }) {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSignup) {
        await signup(email, password)
        setError('')
        setIsSignup(false)
        alert('Signup successful! Please login with your credentials.')
        setEmail('')
        setPassword('')
      } else {
        const response = await signin(email, password)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.admin))
        setIsAuthenticated(true)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>{isSignup ? 'Create Account' : 'Welcome Back'}</h1>

      {error && <div className="error">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Loading...' : isSignup ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <div className="toggle-text">
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          type="button"
          onClick={() => {
            setIsSignup(!isSignup)
            setError('')
            setEmail('')
            setPassword('')
          }}
          disabled={loading}
        >
          {isSignup ? 'Sign In' : 'Sign Up'}
        </button>
      </div>
    </div>
  )
}

export default Login
