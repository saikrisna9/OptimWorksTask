import  { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { 
  Heart, 
  Search, 
  Calendar, 
  Clock, 
  Building2, 
  Stethoscope, 
  DollarSign, 
  User,
  MapPin,
  Star,
  Filter,
  BookOpen
} from 'lucide-react'

const Patient = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState('')
  const [selectedHospital, setSelectedHospital] = useState('')
  const [bookedAppointments, setBookedAppointments] = useState(() => {
  
    const stored = localStorage.getItem('bookedAppointments')
    if (stored) {
      return JSON.parse(stored)
    }

    return [
      { doctorId: 2, date: '2024-01-15', time: '11:00', patientName: 'Mike Wilson' },
      { doctorId: 1, date: '2024-01-16', time: '10:00', patientName: 'Sarah Davis' }
    ]
  })


  const doctors = [
    {
      id: 1,
      name: 'Dr. John Smith',
      specialization: 'Cardiology',
      hospital: 'City General Hospital',
      experience: 8,
      rating: 4.8,
      fee: 300,
      availableSlots: [
        { date: '2024-01-15', time: '09:00', available: true },
        { date: '2024-01-15', time: '14:00', available: true },
        { date: '2024-01-16', time: '10:00', available: false }
      ]
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      specialization: 'Orthopedics',
      hospital: 'Medical Center',
      experience: 12,
      rating: 4.9,
      fee: 350,
      availableSlots: [
        { date: '2024-01-15', time: '11:00', available: true },
        { date: '2024-01-16', time: '15:00', available: true }
      ]
    },
    {
      id: 3,
      name: 'Dr. Michael Brown',
      specialization: 'Pediatrics',
      hospital: 'City General Hospital',
      experience: 6,
      rating: 4.7,
      fee: 250,
      availableSlots: [
        { date: '2024-01-15', time: '16:00', available: true }
      ]
    }
  ]

  const [patientAppointments, setPatientAppointments] = useState([])

  useEffect(() => {
    if (user?.id) {
      const stored = localStorage.getItem(`patientAppointments_${user.id}`)
      if (stored) {
        setPatientAppointments(JSON.parse(stored))
      } else {
       
        setPatientAppointments([])
        localStorage.setItem(`patientAppointments_${user.id}`, JSON.stringify([]))
      }
    }
  }, [user?.id])

  const specializations = ['Cardiology', 'Orthopedics', 'Pediatrics', 'Neurology', 'Dermatology']
  const hospitals = ['City General Hospital', 'Medical Center', 'Community Hospital']

  
  const totalAppointments = patientAppointments.length
  const totalSpent = patientAppointments.filter(apt => apt.status === 'completed').reduce((sum, apt) => sum + apt.fee, 0)
  const upcomingAppointments = patientAppointments.filter(apt => apt.status === 'scheduled').length
  const completedConsultations = patientAppointments.filter(apt => apt.status === 'completed').length

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
   doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialization = !selectedSpecialization || doctor.specialization === selectedSpecialization
    const matchesHospital = !selectedHospital || doctor.hospital === selectedHospital
    
    return matchesSearch && matchesSpecialization && matchesHospital
  })
  const isSlotBooked = (doctorId, date, time) => {
    return bookedAppointments.some(booking => 
      booking.doctorId === doctorId && 
      booking.date === date && 
      booking.time === time
    )
  }

  
  const isSlotAvailable = (doctor, slot) => {
    
    const isInAvailableSlots = doctor.availableSlots.some(availableSlot => 
      availableSlot.date === slot.date && 
      availableSlot.time === slot.time && 
      availableSlot.available
    )
    
   
    const isNotBooked = !isSlotBooked(doctor.id, slot.date, slot.time)
    
    return isInAvailableSlots && isNotBooked
  }

  const handleBookAppointment = (doctorId, slot) => {
    const doctor = doctors.find(d => d.id === doctorId)
    
   
    if (isSlotBooked(doctorId, slot.date, slot.time)) {
      alert(`❌ This slot is already booked by another patient. Please choose a different time.`)
      return
    }

    if (!isSlotAvailable(doctor, slot)) {
      alert(`❌ This slot is not available. Please choose a different time.`)
      return
    }
    
    // Book the appointment
    const newBooking = {
      doctorId: doctorId,
      date: slot.date,
      time: slot.time,
      patientName: user?.name
    }
    
    const updatedBookings = [...bookedAppointments, newBooking]
    setBookedAppointments(updatedBookings)
    
    localStorage.setItem('bookedAppointments', JSON.stringify(updatedBookings))
    
    const newAppointment = {
      id: Date.now(),
      doctor: doctor.name,
      hospital: doctor.hospital,
      date: slot.date,
      time: slot.time,
      fee: doctor.fee,
      status: 'scheduled',
      specialization: doctor.specialization,
      notes: 'New appointment'
    }
    
    const updatedPatientAppointments = [...patientAppointments, newAppointment]
    setPatientAppointments(updatedPatientAppointments)
    
   
    localStorage.setItem(`patientAppointments_${user?.id}`, JSON.stringify(updatedPatientAppointments))
    
    alert(`✅ Appointment successfully booked with ${doctor.name} on ${slot.date} at ${slot.time}`)
  }

  const handleCancelAppointment = (appointment) => {
   
    const updatedBookedAppointments = bookedAppointments.filter(booking => 
      !(booking.doctorId === doctors.find(d => d.name === appointment.doctor)?.id && 
        booking.date === appointment.date && 
        booking.time === appointment.time)
    )
    setBookedAppointments(updatedBookedAppointments)
   
    localStorage.setItem('bookedAppointments', JSON.stringify(updatedBookedAppointments))
    
    
    const updatedPatientAppointments = patientAppointments.map(apt => 
      apt.id === appointment.id ? { ...apt, status: 'cancelled' } : apt
    )
    setPatientAppointments(updatedPatientAppointments)
    
    // Save patient appointments to localStorage
    localStorage.setItem(`patientAppointments_${user?.id}`, JSON.stringify(updatedPatientAppointments))
    
    alert(`✅ Appointment cancelled successfully`)
  }

  // Function to clear patient data (for testing)
  const clearPatientData = () => {
    localStorage.removeItem(`patientAppointments_${user?.id}`)
    setPatientAppointments([])
    alert('Patient data cleared successfully!')
  }

  // Function to show current user data (for debugging)
  const showUserData = () => {
    const userData = {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      role: user?.role,
      appointments: patientAppointments.length,
      localStorageKey: `patientAppointments_${user?.id}`
    }
    console.log('Current User Data:', userData)
    alert(`User Data:\nID: ${userData.id}\nName: ${userData.name}\nEmail: ${userData.email}\nRole: ${userData.role}\nAppointments: ${userData.appointments}\nStorage Key: ${userData.localStorageKey}`)
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Heart size={20} /> },
    { id: 'search', label: 'Find Doctors', icon: <Search size={20} /> },
    { id: 'appointments', label: 'My Appointments', icon: <Calendar size={20} /> },
    { id: 'history', label: 'Consultation History', icon: <BookOpen size={20} /> }
  ]

  return (
    <div>
      {/* Header */}
      <div className="card">
        <div className="card-header">
          <Heart className="card-icon" />
          <div>
            <h2 className="card-title">Patient Portal</h2>
            <p style={{ color: '#666', margin: 0 }}>
              Welcome back, {user?.name || 'Patient'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <User size={16} />
              <span style={{ fontSize: '0.9rem' }}>
                ID: {user?.uniqueId || 'Not assigned'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{totalAppointments}</div>
          <div className="stat-label">Total Appointments</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">₹{totalSpent.toLocaleString()}</div>
          <div className="stat-label">Total Spent</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{upcomingAppointments}</div>
          <div className="stat-label">Upcoming Appointments</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{completedConsultations}</div>
          <div className="stat-label">Completed Consultations</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #f0f0f0', paddingBottom: '1rem' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-2">
              <div className="card">
                <h3 className="mb-2">Patient Information</h3>
                <div className="mb-2">
                  <strong>Name:</strong> {user?.name || 'Patient'}
                </div>
                <div className="mb-2">
                  <strong>Gender:</strong> {user?.gender || 'Not specified'}
                </div>
                <div className="mb-2">
                  <strong>Date of Birth:</strong> {user?.dateOfBirth || 'Not specified'}
                </div>
                <div className="mb-2">
                  <strong>Unique ID:</strong> {user?.uniqueId || 'Not assigned'}
                </div>
                <div className="mb-2">
                  <strong>Email:</strong> {user?.email || 'Not provided'}
                </div>
              </div>

              <div className="card">
                <h3 className="mb-2">Recent Activity</h3>
                <div style={{ fontSize: '0.9rem' }}>
                  {patientAppointments.length > 0 ? (
                    <>
                      {patientAppointments.slice(0, 3).map(appointment => (
                        <div key={appointment.id} className="mb-2">
                          • {appointment.status === 'scheduled' ? 'Appointment scheduled' : 'Consultation completed'} with {appointment.doctor}
                        </div>
                      ))}
                      {patientAppointments.length === 0 && (
                        <div className="mb-2">• Welcome! Start by booking your first appointment</div>
                      )}
                    </>
                  ) : (
                    <div className="mb-2">• Welcome! Start by booking your first appointment</div>
                  )}
                </div>
              </div>
            </div>

            <div className="card mt-3">
              <h3 className="mb-2">Upcoming Appointments</h3>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Doctor</th>
                      <th>Hospital</th>
                      <th>Date & Time</th>
                      <th>Fee</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientAppointments.filter(apt => apt.status === 'scheduled').map(appointment => (
                      <tr key={appointment.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Stethoscope size={16} />
                            <strong>{appointment.doctor}</strong>
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Building2 size={16} />
                            {appointment.hospital}
                          </div>
                        </td>
                        <td>
                          {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                        </td>
                        <td>₹{appointment.fee}</td>
                        <td>
                          <span className="badge badge-info">Scheduled</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Search Doctors Tab */}
        {activeTab === 'search' && (
          <div>
            <div className="card mb-3">
              <h3 className="mb-2">Find Doctors</h3>
              
              {/* Booking Status Summary */}
              <div style={{ 
                backgroundColor: 'rgba(100, 255, 218, 0.1)', 
                border: '1px solid rgba(100, 255, 218, 0.3)', 
                borderRadius: '8px', 
                padding: '1rem', 
                marginBottom: '1rem' 
              }}>
                <h4 style={{ color: '#64ffda', marginBottom: '0.5rem' }}>Booking Status</h4>
                <div style={{ fontSize: '0.875rem', color: '#b8c5d6' }}>
                  <div>• <span style={{ color: '#64ffda' }}>Blue buttons</span>: Available slots you can book</div>
                  <div>• <span style={{ color: '#dc3545' }}>Red buttons</span>: Slots booked by other patients</div>
                  <div>• <span style={{ color: '#28a745' }}>Green buttons</span>: Slots you have booked</div>
                  <div>• <span style={{ color: '#6c757d' }}>Gray buttons</span>: Unavailable slots</div>
                </div>
                <div style={{ 
                  marginTop: '0.5rem', 
                  paddingTop: '0.5rem', 
                  borderTop: '1px solid rgba(100, 255, 218, 0.2)', 
                  fontSize: '0.8rem', 
                  color: '#8892b0' 
                }}>
                  Total booked slots in system: {bookedAppointments.length}
                </div>
              </div>
              
              {/* Search and Filters */}
              <div className="grid grid-3">
                <div className="form-group">
                  <label className="form-label">Search</label>
                  <div style={{ position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                    <input
                      type="text"
                      className="form-input"
                      style={{ paddingLeft: '2.5rem' }}
                      placeholder="Search doctors or hospitals..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Specialization</label>
                  <select
                    className="form-select"
                    value={selectedSpecialization}
                    onChange={(e) => setSelectedSpecialization(e.target.value)}
                  >
                    <option value="">All Specializations</option>
                    {specializations.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Hospital</label>
                  <select
                    className="form-select"
                    value={selectedHospital}
                    onChange={(e) => setSelectedHospital(e.target.value)}
                  >
                    <option value="">All Hospitals</option>
                    {hospitals.map(hospital => (
                      <option key={hospital} value={hospital}>{hospital}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Doctors List */}
            <div className="grid grid-2">
              {filteredDoctors.map(doctor => (
                <div key={doctor.id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <h4 className="mb-1">{doctor.name}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Stethoscope size={16} />
                        <span style={{ color: '#666' }}>{doctor.specialization}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Building2 size={16} />
                        <span style={{ color: '#666' }}>{doctor.hospital}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Star size={16} style={{ color: '#ffc107' }} />
                        <span>{doctor.rating} ({doctor.experience} years exp.)</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#667eea' }}>
                        ₹{doctor.fee}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#666' }}>per consultation</div>
                      <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem' }}>
                        {doctor.availableSlots.filter(slot => isSlotAvailable(doctor, slot)).length} slots available
                      </div>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid #e1e5e9', paddingTop: '1rem' }}>
                    <h5 className="mb-2">Available Slots</h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {doctor.availableSlots.map((slot, index) => {
                        const isBooked = isSlotBooked(doctor.id, slot.date, slot.time)
                        const isAvailable = isSlotAvailable(doctor, slot)
                        const bookedByCurrentPatient = bookedAppointments.find(b => 
                          b.doctorId === doctor.id && 
                          b.date === slot.date && 
                          b.time === slot.time
                        )?.patientName === user?.name
                        
                        return (
                          <button
                            key={index}
                            className={`btn ${isAvailable ? 'btn-primary' : isBooked ? (bookedByCurrentPatient ? 'btn-success' : 'btn-danger') : 'btn-secondary'}`}
                            style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                            onClick={() => isAvailable ? handleBookAppointment(doctor.id, slot) : null}
                            disabled={!isAvailable}
                            title={isBooked ? `Booked by ${bookedAppointments.find(b => b.doctorId === doctor.id && b.date === slot.date && b.time === slot.time)?.patientName}` : ''}
                          >
                            {new Date(slot.date).toLocaleDateString()} {slot.time}
                            {isBooked && (
                              <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem' }}>
                                {bookedByCurrentPatient ? '✅' : '🔒'}
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3>My Appointments</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  className="btn btn-secondary" 
                  onClick={showUserData}
                  style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                >
                  Show User Data
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={clearPatientData}
                  style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                >
                  Clear My Data (Testing)
                </button>
              </div>
            </div>
            
            {patientAppointments.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
                <h3 style={{ marginBottom: '1rem' }}>No Appointments Yet</h3>
                <p style={{ color: '#666', marginBottom: '2rem' }}>
                  You haven't booked any appointments yet. Start by finding a doctor and booking your first consultation!
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setActiveTab('search')}
                >
                  Find Doctors
                </button>
              </div>
            ) : (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Doctor</th>
                      <th>Hospital</th>
                      <th>Date & Time</th>
                      <th>Fee</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientAppointments.map(appointment => (
                      <tr key={appointment.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Stethoscope size={16} />
                            <strong>{appointment.doctor}</strong>
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Building2 size={16} />
                            {appointment.hospital}
                          </div>
                        </td>
                        <td>
                          {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                        </td>
                        <td>₹{appointment.fee}</td>
                        <td>
                          <span className={`badge ${appointment.status === 'completed' ? 'badge-success' : 'badge-info'}`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td>
                          {appointment.status === 'scheduled' && (
                            <button 
                              className="btn btn-danger" 
                              style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                              onClick={() => handleCancelAppointment(appointment)}
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div>
            {patientAppointments.filter(apt => apt.status === 'completed').length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
                <h3 style={{ marginBottom: '1rem' }}>No Consultation History</h3>
                <p style={{ color: '#666', marginBottom: '2rem' }}>
                  You haven't completed any consultations yet. Your consultation history will appear here once you complete your first appointment.
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setActiveTab('search')}
                >
                  Book Your First Consultation
                </button>
              </div>
            ) : (
              <div className="grid grid-2">
                <div className="card">
                  <h3 className="mb-2">Consultation Summary</h3>
                  <div className="mb-2">
                    <strong>Total Consultations:</strong> {patientAppointments.filter(apt => apt.status === 'completed').length}
                  </div>
                  <div className="mb-2">
                    <strong>Total Spent:</strong> ₹{patientAppointments.filter(apt => apt.status === 'completed').reduce((sum, apt) => sum + apt.fee, 0).toLocaleString()}
                  </div>
                  <div className="mb-2">
                    <strong>Hospitals Visited:</strong> {new Set(patientAppointments.filter(apt => apt.status === 'completed').map(apt => apt.hospital)).size}
                  </div>
                  <div className="mb-2">
                    <strong>Doctors Consulted:</strong> {new Set(patientAppointments.filter(apt => apt.status === 'completed').map(apt => apt.doctor)).size}
                  </div>
                </div>

                <div className="card">
                  <h3 className="mb-2">Consultations by Specialization</h3>
                  <div>
                    {(() => {
                      const specializationCounts = {}
                      patientAppointments.filter(apt => apt.status === 'completed').forEach(apt => {
                        specializationCounts[apt.specialization] = (specializationCounts[apt.specialization] || 0) + 1
                      })
                      return Object.entries(specializationCounts).map(([spec, count]) => (
                        <div key={spec} className="mb-2">
                          <strong>{spec}:</strong> {count} consultation{count > 1 ? 's' : ''}
                        </div>
                      ))
                    })()}
                  </div>
                </div>
              </div>
            )}

            <div className="card mt-3">
              <h3 className="mb-2">Complete Consultation History</h3>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date & Time</th>
                      <th>Doctor</th>
                      <th>Specialization</th>
                      <th>Hospital</th>
                      <th>Fee</th>
                      <th>Notes</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientAppointments.filter(apt => apt.status === 'completed').map(appointment => (
                      <tr key={appointment.id}>
                        <td>
                          <div>
                            <div><strong>{new Date(appointment.date).toLocaleDateString()}</strong></div>
                            <div style={{ fontSize: '0.875rem', color: '#666' }}>{appointment.time}</div>
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Stethoscope size={16} />
                            <strong>{appointment.doctor}</strong>
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-info">{appointment.specialization}</span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Building2 size={16} />
                            {appointment.hospital}
                          </div>
                        </td>
                        <td>₹{appointment.fee}</td>
                        <td>
                          <div style={{ fontSize: '0.875rem', color: '#666', maxWidth: '200px' }}>
                            {appointment.notes}
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-success">Completed</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card mt-3">
              <h3 className="mb-2">Consultations by Hospital</h3>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Hospital</th>
                      <th>Consultations</th>
                      <th>Total Spent</th>
                      <th>Average per Visit</th>
                      <th>Last Visit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const hospitalStats = {}
                      patientAppointments.filter(apt => apt.status === 'completed').forEach(apt => {
                        if (!hospitalStats[apt.hospital]) {
                          hospitalStats[apt.hospital] = {
                            consultations: 0,
                            totalSpent: 0,
                            lastVisit: null
                          }
                        }
                        hospitalStats[apt.hospital].consultations++
                        hospitalStats[apt.hospital].totalSpent += apt.fee
                        const visitDate = new Date(apt.date)
                        if (!hospitalStats[apt.hospital].lastVisit || visitDate > hospitalStats[apt.hospital].lastVisit) {
                          hospitalStats[apt.hospital].lastVisit = visitDate
                        }
                      })
                      return Object.entries(hospitalStats).map(([hospital, stats]) => (
                        <tr key={hospital}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <Building2 size={16} />
                              <strong>{hospital}</strong>
                            </div>
                          </td>
                          <td>{stats.consultations}</td>
                          <td>₹{stats.totalSpent.toLocaleString()}</td>
                          <td>₹{(stats.totalSpent / stats.consultations).toFixed(0)}</td>
                          <td>{stats.lastVisit.toLocaleDateString()}</td>
                        </tr>
                      ))
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Patient 