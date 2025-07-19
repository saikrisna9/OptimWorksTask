import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  Building2, 
  Stethoscope, 
  Heart, 
  Users, 
  Calendar, 
  DollarSign, 
  Shield,
  ArrowRight,
  Star,
  Activity,
  Clock
} from 'lucide-react'

const Home = () => {
  const { isAuthenticated } = useAuth()

  const features = [
    {
      icon: <Building2 size={48} />,
      title: 'Smart Hospital Management',
      description: 'Advanced hospital registration and department management with AI-powered insights'
    },
    {
      icon: <Stethoscope size={48} />,
      title: 'Doctor Excellence Portal',
      description: 'Comprehensive doctor management with advanced scheduling and consultation tracking'
    },
    {
      icon: <Heart size={48} />,
      title: 'Patient-Centric Care',
      description: 'Intuitive patient portal with seamless appointment booking and health tracking'
    },
    {
      icon: <Calendar size={48} />,
      title: 'Intelligent Scheduling',
      description: 'AI-powered appointment system with real-time availability and smart recommendations'
    },
    {
      icon: <DollarSign size={48} />,
      title: 'Advanced Analytics',
      description: 'Comprehensive revenue tracking with predictive analytics and financial insights'
    },
    {
      icon: <Shield size={48} />,
      title: 'Enterprise Security',
      description: 'Bank-grade security with role-based access control and data encryption'
    }
  ]

  const stats = [
    { number: '500+', label: 'Hospitals', icon: <Building2 size={24} /> },
    { number: '2000+', label: 'Doctors', icon: <Stethoscope size={24} /> },
    { number: '50K+', label: 'Patients', icon: <Heart size={24} /> },
    { number: '100K+', label: 'Appointments', icon: <Calendar size={24} /> }
  ]

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Cardiologist',
      hospital: 'City General Hospital',
      text: 'MediHub has revolutionized how I manage my practice. The scheduling system is incredibly intuitive.',
      rating: 5
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Hospital Administrator',
      hospital: 'Medical Center',
      text: 'The analytics and reporting features have given us unprecedented insights into our operations.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Patient',
      hospital: 'Community Hospital',
      text: 'Booking appointments has never been easier. The platform is user-friendly and reliable.',
      rating: 5
    }
  ]

  return (
    <div className="fade-in-up">
      {/* Hero Section */}
      <div className="hero">
        <h1>Next-Generation Healthcare Management</h1>
        <p>
          Experience the future of healthcare with our AI-powered hospital management platform. 
          Streamline operations, enhance patient care, and drive growth with cutting-edge technology.
        </p>
        
        {!isAuthenticated && (
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">
              <Users size={20} />
              Get Started
              <ArrowRight size={20} />
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Sign In
            </Link>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              {stat.icon}
            </div>
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="card">
        <div className="card-header">
          <Activity className="card-icon" />
          <h2 className="card-title">Platform Features</h2>
        </div>
        
        <div className="grid grid-3">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-3">
              <div className="mb-2" style={{ color: '#64ffda' }}>
                {feature.icon}
              </div>
              <h3 className="mb-1" style={{ color: '#e0e0e0' }}>{feature.title}</h3>
              <p style={{ color: '#8892b0' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Role-based Information */}
      <div className="grid grid-2">
        {/* Hospital Admin */}
        <div className="card">
          <div className="card-header">
            <Building2 className="card-icon" />
            <h3 className="card-title">For Hospital Administrators</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#64ffda', borderRadius: '50%' }}></div>
              Advanced hospital registration and management
            </li>
            <li className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#64ffda', borderRadius: '50%' }}></div>
              AI-powered department optimization
            </li>
            <li className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#64ffda', borderRadius: '50%' }}></div>
              Real-time analytics and reporting
            </li>
            <li className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#64ffda', borderRadius: '50%' }}></div>
              Predictive revenue forecasting
            </li>
            <li className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#64ffda', borderRadius: '50%' }}></div>
              Comprehensive staff management
            </li>
          </ul>
        </div>

        {/* Doctors */}
        <div className="card">
          <div className="card-header">
            <Stethoscope className="card-icon" />
            <h3 className="card-title">For Healthcare Professionals</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#64ffda', borderRadius: '50%' }}></div>
              Advanced qualification and specialization management
            </li>
            <li className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#64ffda', borderRadius: '50%' }}></div>
              Multi-hospital association with smart scheduling
            </li>
            <li className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#64ffda', borderRadius: '50%' }}></div>
              Dynamic fee management and earnings tracking
            </li>
            <li className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#64ffda', borderRadius: '50%' }}></div>
              Patient history and consultation analytics
            </li>
            <li className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#64ffda', borderRadius: '50%' }}></div>
              Performance insights and growth metrics
            </li>
          </ul>
        </div>

        {/* Patients */}
        <div className="card">
          <div className="card-header">
            <Heart className="card-icon" />
            <h3 className="card-title">For Patients</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#64ffda', borderRadius: '50%' }}></div>
              Seamless registration with secure ID verification
            </li>
            <li className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#64ffda', borderRadius: '50%' }}></div>
              AI-powered doctor recommendation system
            </li>
            <li className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#64ffda', borderRadius: '50%' }}></div>
              One-click appointment booking with smart reminders
            </li>
            <li className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#64ffda', borderRadius: '50%' }}></div>
              Comprehensive health history tracking
            </li>
            <li className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#64ffda', borderRadius: '50%' }}></div>
              Cross-hospital appointment management
            </li>
          </ul>
        </div>

        {/* Revenue System */}
        <div className="card">
          <div className="card-header">
            <DollarSign className="card-icon" />
            <h3 className="card-title">Smart Revenue Management</h3>
          </div>
          <div className="text-center">
            <div className="stat-number mb-2">60% / 40%</div>
            <p className="mb-2" style={{ color: '#e0e0e0' }}>Intelligent Revenue Sharing</p>
            <p style={{ color: '#8892b0', fontSize: '0.9rem' }}>
              Automated revenue distribution with real-time tracking and predictive analytics
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem' }}>
              <div>
                <div style={{ color: '#64ffda', fontWeight: '600' }}>60%</div>
                <div style={{ fontSize: '0.875rem', color: '#8892b0' }}>Doctors</div>
              </div>
              <div>
                <div style={{ color: '#00d4ff', fontWeight: '600' }}>40%</div>
                <div style={{ fontSize: '0.875rem', color: '#8892b0' }}>Hospitals</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="card">
        <div className="card-header">
          <Star className="card-icon" />
          <h2 className="card-title">What Our Users Say</h2>
        </div>
        <div className="grid grid-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} style={{ color: '#ffc107' }} />
                ))}
              </div>
              <p style={{ color: '#b8c5d6', marginBottom: '1rem', fontStyle: 'italic' }}>
                "{testimonial.text}"
              </p>
              <div>
                <div style={{ fontWeight: '600', color: '#e0e0e0' }}>{testimonial.name}</div>
                <div style={{ fontSize: '0.875rem', color: '#8892b0' }}>
                  {testimonial.role} • {testimonial.hospital}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      {!isAuthenticated && (
        <div className="card text-center">
          <h2 className="mb-2">Ready to Transform Healthcare?</h2>
          <p className="mb-3" style={{ color: '#8892b0' }}>
            Join thousands of healthcare professionals already using MediHub
          </p>
          <Link to="/register" className="btn btn-primary">
            <Users size={20} />
            Start Your Journey
            <ArrowRight size={20} />
          </Link>
        </div>
      )}
    </div>
  )
}

export default Home 