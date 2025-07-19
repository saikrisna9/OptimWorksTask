import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { 
  Stethoscope, 
  DollarSign, 
  Calendar, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Building2,
  Clock,
  MapPin,
  Star
} from 'lucide-react'

const Doctor = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddAvailability, setShowAddAvailability] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [newAvailability, setNewAvailability] = useState({
    hospital: '',
    date: '',
    startTime: '',
    endTime: '',
    fee: ''
  })
  const [availability, setAvailability] = useState([
    {
      id: 1,
      hospital: 'City General Hospital',
      date: '2024-01-15',
      startTime: '09:00',
      endTime: '17:00',
      fee: 300,
      status: 'available'
    },
    {
      id: 2,
      hospital: 'Medical Center',
      date: '2024-01-16',
      startTime: '10:00',
      endTime: '16:00',
      fee: 350,
      status: 'booked'
    }
  ])

  // Mock data
  const hospitals = [
    { id: 1, name: 'City General Hospital', location: 'Downtown' },
    { id: 2, name: 'Medical Center', location: 'Uptown' }
  ]

  const consultations = [
    {
      id: 1,
      patient: 'Jane Doe',
      hospital: 'City General Hospital',
      date: '2024-01-10',
      time: '14:00',
      fee: 300,
      status: 'completed',
      department: 'Cardiology'
    },
    {
      id: 2,
      patient: 'John Smith',
      hospital: 'Medical Center',
      date: '2024-01-12',
      time: '11:00',
      fee: 350,
      status: 'scheduled',
      department: 'Cardiology'
    },
    {
      id: 3,
      patient: 'Mike Wilson',
      hospital: 'City General Hospital',
      date: '2024-01-08',
      time: '16:00',
      fee: 300,
      status: 'completed',
      department: 'Cardiology'
    },
    {
      id: 4,
      patient: 'Sarah Davis',
      hospital: 'Medical Center',
      date: '2024-01-05',
      time: '09:00',
      fee: 350,
      status: 'completed',
      department: 'Cardiology'
    }
  ]

  const totalEarnings = 12500
  const totalConsultations = 25
  const associatedHospitals = 2
  const upcomingAppointments = 3

  const handleDeleteAvailability = (id) => {
    setAvailability(prev => prev.filter(slot => slot.id !== id))
  }

  const handleEditAvailability = (slot) => {
    setShowAddAvailability(true)
    setIsEditing(true)
    setEditId(slot.id)
    setNewAvailability({
      hospital: slot.hospital,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      fee: slot.fee
    })
  }

  const handleAddAvailability = () => {
    if (newAvailability.hospital && newAvailability.date && newAvailability.startTime && newAvailability.endTime && newAvailability.fee) {
      if (isEditing) {
        // Update existing slot
        setAvailability(prev => prev.map(slot => slot.id === editId ? {
          ...slot,
          ...newAvailability,
          fee: parseInt(newAvailability.fee)
        } : slot))
        setIsEditing(false)
        setEditId(null)
      } else {
        // Add new slot
        const availabilitySlot = {
          id: Date.now(),
          hospital: newAvailability.hospital,
          date: newAvailability.date,
          startTime: newAvailability.startTime,
          endTime: newAvailability.endTime,
          fee: parseInt(newAvailability.fee),
          status: 'available'
        }
        setAvailability(prevAvailability => [...prevAvailability, availabilitySlot])
      }
      // Reset the form
      setNewAvailability({
        hospital: '',
        date: '',
        startTime: '',
        endTime: '',
        fee: ''
      })
      setShowAddAvailability(false)
      setIsEditing(false)
      setEditId(null)
      alert(isEditing ? 'Availability slot updated successfully!' : 'Availability slot added successfully!')
    } else {
      alert('Please fill in all required fields')
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Stethoscope size={20} /> },
    { id: 'availability', label: 'Availability', icon: <Calendar size={20} /> },
    { id: 'consultations', label: 'Consultations', icon: <Users size={20} /> },
    { id: 'earnings', label: 'Earnings Report', icon: <DollarSign size={20} /> }
  ]

  return (
    <div>
     
      <div className="card">
        <div className="card-header">
          <Stethoscope className="card-icon" />
          <div>
            <h2 className="card-title">Doctor Dashboard</h2>
            <p style={{ color: '#666', margin: 0 }}>
              Welcome back, {user?.name || 'Doctor'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Star size={16} style={{ color: '#ffc107' }} />
              <span style={{ fontSize: '0.9rem' }}>
                {user?.specializations?.join(', ') || 'Cardiology, Internal Medicine'}
              </span>
            </div>
          </div>
        </div>
      </div>

      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">₹{totalEarnings.toLocaleString()}</div>
          <div className="stat-label">Total Earnings</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalConsultations}</div>
          <div className="stat-label">Total Consultations</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{associatedHospitals}</div>
          <div className="stat-label">Associated Hospitals</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{upcomingAppointments}</div>
          <div className="stat-label">Upcoming Appointments</div>
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
                <h3 className="mb-2">Doctor Information</h3>
                <div className="mb-2">
                  <strong>Name:</strong> {user?.name || 'Dr. John Smith'}
                </div>
                <div className="mb-2">
                  <strong>Qualifications:</strong> {user?.qualifications || 'MBBS, MD (Cardiology)'}
                </div>
                <div className="mb-2">
                  <strong>Experience:</strong> {user?.experience || 8} years
                </div>
                <div className="mb-2">
                  <strong>Specializations:</strong> {user?.specializations?.join(', ') || 'Cardiology, Internal Medicine'}
                </div>
              </div>

              <div className="card">
                <h3 className="mb-2">Associated Hospitals</h3>
                {hospitals.map(hospital => (
                  <div key={hospital.id} className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Building2 size={16} />
                    <div>
                      <div><strong>{hospital.name}</strong></div>
                      <div style={{ fontSize: '0.875rem', color: '#666' }}>
                        <MapPin size={12} style={{ display: 'inline', marginRight: '0.25rem' }} />
                        {hospital.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card mt-3">
              <h3 className="mb-2">Recent Activity</h3>
              <div style={{ fontSize: '0.9rem' }}>
                <div className="mb-2">• Consultation completed with Jane Doe at City General Hospital</div>
                <div className="mb-2">• New availability slot added for Medical Center</div>
                <div className="mb-2">• Earnings: ₹300 from today's consultation</div>
                <div className="mb-2">• Upcoming appointment scheduled for tomorrow</div>
              </div>
            </div>
          </div>
        )}

        {/* Availability Tab */}
        {activeTab === 'availability' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3>Manage Availability</h3>
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddAvailability(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Plus size={16} />
                Add Availability
              </button>
            </div>

            {showAddAvailability && (
              <div className="card mb-3">
                <h4 className="mb-2">{isEditing ? 'Edit Availability Slot' : 'Add New Availability Slot'}</h4>
                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Hospital</label>
                    <select
                      className="form-select"
                      value={newAvailability.hospital}
                      onChange={(e) => setNewAvailability({...newAvailability, hospital: e.target.value})}
                    >
                      <option value="">Select hospital</option>
                      {hospitals.map(hospital => (
                        <option key={hospital.id} value={hospital.name}>
                          {hospital.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={newAvailability.date}
                      onChange={(e) => setNewAvailability({...newAvailability, date: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Start Time</label>
                    <input
                      type="time"
                      className="form-input"
                      value={newAvailability.startTime}
                      onChange={(e) => setNewAvailability({...newAvailability, startTime: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">End Time</label>
                    <input
                      type="time"
                      className="form-input"
                      value={newAvailability.endTime}
                      onChange={(e) => setNewAvailability({...newAvailability, endTime: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Consultation Fee (₹)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={newAvailability.fee}
                      onChange={(e) => setNewAvailability({...newAvailability, fee: e.target.value})}
                      placeholder="Enter consultation fee"
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn btn-primary" onClick={handleAddAvailability} type="button">
                    {isEditing ? 'Update Availability' : 'Add Availability'}
                  </button>
                  <button className="btn btn-secondary" onClick={() => { setShowAddAvailability(false); setIsEditing(false); setEditId(null); setNewAvailability({ hospital: '', date: '', startTime: '', endTime: '', fee: '' }) }} type="button">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Hospital</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Fee</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {availability.map(slot => (
                    <tr key={slot.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Building2 size={16} />
                          {slot.hospital}
                        </div>
                      </td>
                      <td>{new Date(slot.date).toLocaleDateString()}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Clock size={16} />
                          {slot.startTime} - {slot.endTime}
                        </div>
                      </td>
                      <td>₹{slot.fee}</td>
                      <td>
                        <span className={`badge ${slot.status === 'available' ? 'badge-success' : 'badge-warning'}`}>
                          {slot.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn btn-secondary" style={{ padding: '0.5rem' }} onClick={() => handleEditAvailability(slot)} type="button">
                            <Edit size={16} />
                          </button>
                          <button className="btn btn-danger" style={{ padding: '0.5rem' }} onClick={() => handleDeleteAvailability(slot.id)} type="button">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Consultations Tab */}
        {activeTab === 'consultations' && (
          <div>
            <h3 className="mb-2">Consultation History</h3>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Hospital</th>
                    <th>Date & Time</th>
                    <th>Fee</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {consultations.map(consultation => (
                    <tr key={consultation.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Users size={16} />
                          <strong>{consultation.patient}</strong>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Building2 size={16} />
                          {consultation.hospital}
                        </div>
                      </td>
                      <td>
                        {new Date(consultation.date).toLocaleDateString()} at {consultation.time}
                      </td>
                      <td>₹{consultation.fee}</td>
                      <td>
                        <span className={`badge ${consultation.status === 'completed' ? 'badge-success' : 'badge-info'}`}>
                          {consultation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <div>
            <div className="grid grid-2">
              <div className="card">
                <h3 className="mb-2">Earnings Summary</h3>
                <div className="mb-2">
                  <strong>Total Earnings:</strong> ₹{totalEarnings.toLocaleString()}
                </div>
                <div className="mb-2">
                  <strong>This Month:</strong> ₹{(totalEarnings * 0.3).toLocaleString()}
                </div>
                <div className="mb-2">
                  <strong>Last Month:</strong> ₹{(totalEarnings * 0.25).toLocaleString()}
                </div>
                <div className="mb-2">
                  <strong>Average per Consultation:</strong> ₹{(totalEarnings / totalConsultations).toFixed(0)}
                </div>
                <div className="mb-2">
                  <strong>Total Consultations:</strong> {totalConsultations}
                </div>
              </div>

              <div className="card">
                <h3 className="mb-2">Earnings by Hospital</h3>
                <div>
                  {hospitals.map(hospital => {
                    const hospitalEarnings = consultations
                      .filter(consultation => consultation.hospital === hospital.name)
                      .reduce((sum, consultation) => sum + consultation.fee, 0)
                    return (
                      <div key={hospital.id} className="mb-2">
                        <strong>{hospital.name}:</strong> ₹{hospitalEarnings.toLocaleString()}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="card mt-3">
              <h3 className="mb-2">Detailed Earnings Breakdown</h3>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Hospital</th>
                      <th>Consultations</th>
                      <th>Total Earnings</th>
                      <th>Average per Consultation</th>
                      <th>Percentage of Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hospitals.map(hospital => {
                      const hospitalConsultations = consultations.filter(c => c.hospital === hospital.name)
                      const hospitalEarnings = hospitalConsultations.reduce((sum, c) => sum + c.fee, 0)
                      const percentage = ((hospitalEarnings / totalEarnings) * 100).toFixed(1)
                      return (
                        <tr key={hospital.id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <Building2 size={16} />
                              <strong>{hospital.name}</strong>
                            </div>
                          </td>
                          <td>{hospitalConsultations.length}</td>
                          <td>₹{hospitalEarnings.toLocaleString()}</td>
                          <td>₹{hospitalConsultations.length > 0 ? (hospitalEarnings / hospitalConsultations.length).toFixed(0) : 0}</td>
                          <td>{percentage}%</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card mt-3">
              <h3 className="mb-2">Monthly Earnings Trend</h3>
              <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <p style={{ color: '#666' }}>Earnings chart would be displayed here</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Doctor 