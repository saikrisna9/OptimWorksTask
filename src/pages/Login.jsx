import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogIn, Eye, EyeOff, AlertCircle, Building2, Stethoscope, Heart } from 'lucide-react'

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      
      if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
        setError('Please fill in all required fields')
        return
      }


      await new Promise(resolve => setTimeout(resolve, 1000))

     
      const userData = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        ...(formData.role === 'patient' && {
          uniqueId: 'P' + Math.random().toString(36).substr(2, 9).toUpperCase()
        }),
        ...(formData.role === 'doctor' && {
          specializations: ['General Medicine'],
          experience: 5
        }),
        ...(formData.role === 'hospital_admin' && {
          hospitalId: 1
        })
      }

      login(userData)
      
      switch (formData.role) {
        case 'hospital_admin':
          navigate('/hospital-admin')
          break
        case 'doctor':
          navigate('/doctor')
          break
        case 'patient':
          navigate('/patient')
          break
        default:
          navigate('/')
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getRoleIcon = (role) => {
    switch (role) {
      case 'hospital_admin':
        return <Building2 size={20} />
      case 'doctor':
        return <Stethoscope size={20} />
      case 'patient':
        return <Heart size={20} />
      default:
        return <Heart size={20} />
    }
  }

  return (
    <div className="fade-in-up">
      <div className="card" style={{ maxWidth: '500px', margin: '2rem auto' }}>
        <div className="card-header">
          <LogIn className="card-icon" />
          <h2 className="card-title">Welcome Back</h2>
          <p style={{ color: '#666', margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>
            Demo Mode: Enter any name and email to login
          </p>
        </div>

        {error && (
          <div className="mb-3" style={{ 
            padding: '1rem', 
            backgroundColor: 'rgba(255, 107, 107, 0.1)', 
            color: '#ff6b6b', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            border: '1px solid rgba(255, 107, 107, 0.3)'
          }}>
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#8892b0'
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Login As</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {[
                { value: 'patient', label: 'Patient', icon: <Heart size={16} /> },
                { value: 'doctor', label: 'Doctor', icon: <Stethoscope size={16} /> },
                { value: 'hospital_admin', label: 'Admin', icon: <Building2 size={16} /> }
              ].map(role => (
                <label
                  key={role.value}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '1rem',
                    border: `1px solid ${formData.role === role.value ? 'rgba(100, 255, 218, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    background: formData.role === role.value ? 'rgba(100, 255, 218, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    checked={formData.role === role.value}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                  <div style={{ color: formData.role === role.value ? '#64ffda' : '#8892b0' }}>
                    {role.icon}
                  </div>
                  <span style={{ 
                    fontSize: '0.875rem', 
                    color: formData.role === role.value ? '#64ffda' : '#b8c5d6',
                    fontWeight: formData.role === role.value ? '600' : '400'
                  }}>
                    {role.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
                Signing In...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          <p style={{ color: '#8892b0' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#64ffda', textDecoration: 'none', fontWeight: '600' }}>
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login 