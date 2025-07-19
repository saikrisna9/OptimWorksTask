import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  LogOut, 
  User, 
  Building2, 
  Stethoscope, 
  Heart, 
  Home,
  Settings,
  BarChart3,
  Calendar,
  Users,
  Activity,
  Search
} from 'lucide-react'

const Sidebar = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  const getNavItems = () => {
    if (!isAuthenticated) {
      return [
        { path: '/', label: 'Home', icon: <Home size={20} /> },
        { path: '/login', label: 'Login', icon: <User size={20} /> },
        { path: '/register', label: 'Register', icon: <User size={20} /> }
      ]
    }

    switch (user?.role) {
      case 'hospital_admin':
        return [
          { path: '/hospital-admin', label: 'Dashboard', icon: <BarChart3 size={20} /> },
          { path: '/hospital-admin', label: 'Departments', icon: <Building2 size={20} /> },
          { path: '/hospital-admin', label: 'Doctors', icon: <Stethoscope size={20} /> },
          { path: '/hospital-admin', label: 'Revenue', icon: <Activity size={20} /> },
          { path: '/hospital-admin', label: 'Reports', icon: <BarChart3 size={20} /> }
        ]
      case 'doctor':
        return [
          { path: '/doctor', label: 'Dashboard', icon: <BarChart3 size={20} /> },
          { path: '/doctor', label: 'Availability', icon: <Calendar size={20} /> },
          { path: '/doctor', label: 'Consultations', icon: <Users size={20} /> },
          { path: '/doctor', label: 'Earnings', icon: <Activity size={20} /> },
          { path: '/doctor', label: 'Schedule', icon: <Calendar size={20} /> }
        ]
      case 'patient':
        return [
          { path: '/patient', label: 'Dashboard', icon: <BarChart3 size={20} /> },
          { path: '/patient', label: 'Find Doctors', icon: <Search size={20} /> },
          { path: '/patient', label: 'Appointments', icon: <Calendar size={20} /> },
          { path: '/patient', label: 'History', icon: <Activity size={20} /> },
          { path: '/patient', label: 'Profile', icon: <User size={20} /> }
        ]
      default:
        return []
    }
  }

  const navItems = getNavItems()

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo">
          <Building2 size={32} />
          <span>MediHub</span>
        </Link>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-section-title">Navigation</div>
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <span className="nav-item-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>

        {isAuthenticated && (
          <div className="nav-section">
            <div className="nav-section-title">Account</div>
            <div className="nav-item">
              <span className="nav-item-icon">
                <User size={20} />
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                  {user?.name || 'User'}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#8892b0', textTransform: 'capitalize' }}>
                  {user?.role?.replace('_', ' ') || 'User'}
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="nav-item"
              style={{ 
                background: 'none', 
                border: 'none', 
                width: '100%', 
                cursor: 'pointer',
                color: '#e0e0e0'
              }}
            >
              <span className="nav-item-icon">
                <LogOut size={20} />
              </span>
              Logout
            </button>
          </div>
        )}

        <div className="nav-section">
          <div className="nav-section-title">Quick Actions</div>
          <Link to="/" className="nav-item">
            <span className="nav-item-icon">
              <Home size={20} />
            </span>
            Home
          </Link>
          {isAuthenticated && (
            <Link to="/settings" className="nav-item">
              <span className="nav-item-icon">
                <Settings size={20} />
              </span>
              Settings
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Sidebar 