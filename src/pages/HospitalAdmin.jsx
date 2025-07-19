import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { 
  Building2, 
  Users, 
  DollarSign, 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Stethoscope,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'

const HospitalAdmin = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [departments, setDepartments] = useState([
    { id: 1, name: 'Cardiology', doctors: 3, consultations: 45 },
    { id: 2, name: 'Orthopedics', doctors: 2, consultations: 32 },
    { id: 3, name: 'Pediatrics', doctors: 4, consultations: 67 }
  ])
  const [doctors, setDoctors] = useState([
    { 
      id: 1, 
      name: 'Dr. John Smith', 
      specialization: 'Cardiology', 
      experience: 8, 
      consultations: 15, 
      revenue: 4500,
      department: 'Cardiology',
      email: 'john.smith@hospital.com',
      phone: '+91 9874561230'
    },
    { 
      id: 2, 
      name: 'Dr. Sarah Johnson', 
      specialization: 'Orthopedics', 
      experience: 12, 
      consultations: 22, 
      revenue: 6600,
      department: 'Orthopedics',
      email: 'sarah.johnson@hospital.com',
      phone: '+91 0987654321'
    },
    { 
      id: 3, 
      name: 'Dr. Michael Brown', 
      specialization: 'Pediatrics', 
      experience: 6, 
      consultations: 18, 
      revenue: 5400,
      department: 'Pediatrics',
      email: 'michael.brown@hospital.com',
      phone: '+91 1234567890'
    },
    { 
      id: 4, 
      name: 'Dr. Emily Davis', 
      specialization: 'Neurology', 
      experience: 10, 
      consultations: 12, 
      revenue: 3600,
      department: 'Neurology',
      email: 'emily.davis@hospital.com',
      phone: '+91 1234567890'
    }
  ])
  const [showAddDepartment, setShowAddDepartment] = useState(false)
  const [newDepartment, setNewDepartment] = useState({ name: '', description: '', doctorIds: [], consultations: [] })
  const [showAddDoctor, setShowAddDoctor] = useState(false)
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialization: '',
    experience: '',
    department: '',
    email: '',
    phone: ''
  })
  const [showInlineAddDoctor, setShowInlineAddDoctor] = useState(false)
  const [inlineDoctor, setInlineDoctor] = useState({
    name: '',
    specialization: '',
    experience: '',
    department: '',
    email: '',
    phone: ''
  })
  const [isEditingDepartment, setIsEditingDepartment] = useState(false)
  const [editDepartmentId, setEditDepartmentId] = useState(null)

  // Mock data
  const totalConsultations = 144
  const totalRevenue = 43200
  const totalDoctors = 9
  const totalDepartments = 3

  const handleAddDepartment = () => {
    if (newDepartment.name.trim()) {
      const assignedDoctors = doctors.filter(doc => newDepartment.doctorIds.includes(doc.id))
      const department = {
        id: Date.now(),
        name: newDepartment.name,
        description: newDepartment.description,
        doctors: assignedDoctors,
        consultations: newDepartment.consultations
      }
      setDepartments([...departments, department])
      setNewDepartment({ name: '', description: '', doctorIds: [], consultations: [] })
      setShowAddDepartment(false)
    }
  }

  const handleDeleteDepartment = (id) => {
    setDepartments(departments.filter(dept => dept.id !== id))
  }

  const handleEditDepartment = (dept) => {
    setShowAddDepartment(true)
    setIsEditingDepartment(true)
    setEditDepartmentId(dept.id)
    setNewDepartment({
      name: dept.name,
      description: dept.description,
      doctorIds: dept.doctors ? dept.doctors.map(d => d.id) : [],
      consultations: dept.consultations || []
    })
  }

  const handleAddOrUpdateDepartment = () => {
    if (newDepartment.name.trim()) {
      const assignedDoctors = doctors.filter(doc => newDepartment.doctorIds.includes(doc.id))
      const department = {
        id: isEditingDepartment ? editDepartmentId : Date.now(),
        name: newDepartment.name,
        description: newDepartment.description,
        doctors: assignedDoctors,
        consultations: newDepartment.consultations
      }
      if (isEditingDepartment) {
        setDepartments(departments.map(d => d.id === editDepartmentId ? department : d))
      } else {
        setDepartments([...departments, department])
      }
      setNewDepartment({ name: '', description: '', doctorIds: [], consultations: [] })
      setShowAddDepartment(false)
      setIsEditingDepartment(false)
      setEditDepartmentId(null)
    }
  }

  const handleAddDoctor = () => {
    if (newDoctor.name && newDoctor.specialization && newDoctor.experience && newDoctor.department) {
      const doctor = {
        id: Date.now(),
        name: newDoctor.name,
        specialization: newDoctor.specialization,
        experience: parseInt(newDoctor.experience),
        consultations: 0,
        revenue: 0,
        department: newDoctor.department,
        email: newDoctor.email,
        phone: newDoctor.phone
      }
      setDoctors([...doctors, doctor])
      setNewDoctor({ name: '', specialization: '', experience: '', department: '', email: '', phone: '' })
      setShowAddDoctor(false)
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Building2 size={20} /> },
    { id: 'departments', label: 'Departments', icon: <Users size={20} /> },
    { id: 'doctors', label: 'Doctors', icon: <Stethoscope size={20} /> },
    { id: 'revenue', label: 'Revenue Reports', icon: <DollarSign size={20} /> },
    { id: 'consultations', label: 'Consultations', icon: <Calendar size={20} /> }
  ]

  return (
    <div>
      {/* Header */}
      <div className="card">
        <div className="card-header">
          <Building2 className="card-icon" />
          <div>
            <h2 className="card-title">Hospital Admin Dashboard</h2>
            <p style={{ color: '#666', margin: 0 }}>
              Welcome back, {user?.name || 'Administrator'}
            </p>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{totalConsultations}</div>
          <div className="stat-label">Total Consultations</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">₹{totalRevenue.toLocaleString()}</div>
          <div className="stat-label">Total Revenue</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalDoctors}</div>
          <div className="stat-label">Associated Doctors</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalDepartments}</div>
          <div className="stat-label">Departments</div>
        </div>
      </div>

      
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

        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-2">
              <div className="card">
                <h3 className="mb-2">Hospital Information</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Building2 size={16} />
                  <span>City General Hospital</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <MapPin size={16} />
                  <span>123 Medical Center Drive, City</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Phone size={16} />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={16} />
                  <span>admin@cityhospital.com</span>
                </div>
              </div>

              <div className="card">
                <h3 className="mb-2">Recent Activity</h3>
                <div style={{ fontSize: '0.9rem' }}>
                  <div className="mb-2">• Dr. Sarah Johnson completed 3 consultations today</div>
                  <div className="mb-2">• New patient registration: Jane Doe</div>
                  <div className="mb-2">• Revenue generated: ₹2,400 from today's consultations</div>
                  <div className="mb-2">• Department update: Pediatrics schedule modified</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'departments' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3>Hospital Departments</h3>
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddDepartment(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Plus size={16} />
                Add Department
              </button>
            </div>

            {showAddDepartment && (
              <div className="card mb-3">
                <h4 className="mb-2">{isEditingDepartment ? 'Edit Department' : 'Add New Department'}</h4>
                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Department Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newDepartment.name}
                      onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                      placeholder="Enter department name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newDepartment.description}
                      onChange={(e) => setNewDepartment({...newDepartment, description: e.target.value})}
                      placeholder="Enter description"
                    />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">Assign Doctors</label>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <select
                        className="form-select"
                        multiple
                        value={newDepartment.doctorIds}
                        onChange={e => {
                          const options = Array.from(e.target.selectedOptions, option => parseInt(option.value))
                          setNewDepartment({...newDepartment, doctorIds: options})
                        }}
                        style={{ flex: 1 }}
                      >
                        {doctors.map(doc => (
                          <option key={doc.id} value={doc.id}>{doc.name} ({doc.specialization})</option>
                        ))}
                      </select>
                      <button className="btn btn-secondary" type="button" onClick={() => setShowInlineAddDoctor(true)}>
                        <Plus size={16} /> Add New Doctor
                      </button>
                    </div>
                    {showInlineAddDoctor && (
                      <div className="card mt-2" style={{ padding: '1rem', background: '#f8f9fa' }}>
                        <h5 style={{ marginBottom: '0.5rem' }}>Add Doctor</h5>
                        <div className="grid grid-2">
                          <input type="text" className="form-input" placeholder="Name" value={inlineDoctor.name} onChange={e => setInlineDoctor({ ...inlineDoctor, name: e.target.value })} />
                          <input type="text" className="form-input" placeholder="Specialization" value={inlineDoctor.specialization} onChange={e => setInlineDoctor({ ...inlineDoctor, specialization: e.target.value })} />
                          <input type="number" className="form-input" placeholder="Experience (years)" value={inlineDoctor.experience} onChange={e => setInlineDoctor({ ...inlineDoctor, experience: e.target.value })} min="0" />
                          <input type="email" className="form-input" placeholder="Email (optional)" value={inlineDoctor.email} onChange={e => setInlineDoctor({ ...inlineDoctor, email: e.target.value })} />
                          <input type="text" className="form-input" placeholder="Phone (optional)" value={inlineDoctor.phone} onChange={e => setInlineDoctor({ ...inlineDoctor, phone: e.target.value })} />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                          <button className="btn btn-primary" type="button" onClick={() => {
                            if (inlineDoctor.name && inlineDoctor.specialization && inlineDoctor.experience) {
                              const newDoc = {
                                id: Date.now(),
                                name: inlineDoctor.name,
                                specialization: inlineDoctor.specialization,
                                experience: parseInt(inlineDoctor.experience),
                                consultations: 0,
                                revenue: 0,
                                department: newDepartment.name,
                                email: inlineDoctor.email,
                                phone: inlineDoctor.phone
                              }
                              setDoctors(prev => [...prev, newDoc])
                              setNewDepartment(nd => ({ ...nd, doctorIds: [...nd.doctorIds, newDoc.id] }))
                              setInlineDoctor({ name: '', specialization: '', experience: '', department: '', email: '', phone: '' })
                              setShowInlineAddDoctor(false)
                            }
                          }}>Add</button>
                          <button className="btn btn-secondary" type="button" onClick={() => setShowInlineAddDoctor(false)}>Cancel</button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">Add Initial Consultations (optional)</label>
                    <button className="btn btn-secondary" type="button" onClick={() => setNewDepartment({...newDepartment, consultations: [...newDepartment.consultations, { patient: '', date: '', doctorId: '' }]})}>
                      + Add Consultation
                    </button>
                    {newDepartment.consultations.map((c, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Patient Name"
                          value={c.patient}
                          onChange={e => {
                            const updated = [...newDepartment.consultations]
                            updated[idx].patient = e.target.value
                            setNewDepartment({...newDepartment, consultations: updated})
                          }}
                          style={{ width: '30%' }}
                        />
                        <input
                          type="date"
                          className="form-input"
                          value={c.date}
                          onChange={e => {
                            const updated = [...newDepartment.consultations]
                            updated[idx].date = e.target.value
                            setNewDepartment({...newDepartment, consultations: updated})
                          }}
                          style={{ width: '30%' }}
                        />
                        <select
                          className="form-select"
                          value={c.doctorId}
                          onChange={e => {
                            const updated = [...newDepartment.consultations]
                            updated[idx].doctorId = parseInt(e.target.value)
                            setNewDepartment({...newDepartment, consultations: updated})
                          }}
                          style={{ width: '30%' }}
                        >
                          <option value="">Select Doctor</option>
                          {doctors.filter(doc => newDepartment.doctorIds.includes(doc.id)).map(doc => (
                            <option key={doc.id} value={doc.id}>{doc.name}</option>
                          ))}
                        </select>
                        <button className="btn btn-danger" type="button" onClick={() => {
                          const updated = [...newDepartment.consultations]
                          updated.splice(idx, 1)
                          setNewDepartment({...newDepartment, consultations: updated})
                        }}>Remove</button>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn btn-primary" onClick={handleAddOrUpdateDepartment}>
                    {isEditingDepartment ? 'Update Department' : 'Add Department'}
                  </button>
                  <button className="btn btn-secondary" onClick={() => { setShowAddDepartment(false); setIsEditingDepartment(false); setEditDepartmentId(null); setNewDepartment({ name: '', description: '', doctorIds: [], consultations: [] }) }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Doctors</th>
                    <th>Consultations</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map(dept => (
                    <tr key={dept.id}>
                      <td>
                        <div>
                          <strong>{dept.name}</strong>
                          {dept.description && (
                            <div style={{ fontSize: '0.875rem', color: '#666' }}>
                              {dept.description}
                            </div>
                          )}
                          {dept.doctors && dept.doctors.length > 0 && (
                            <div style={{ fontSize: '0.85rem', color: '#444', marginTop: '0.25rem' }}>
                              <strong>Doctors:</strong> {dept.doctors.map(d => d.name).join(', ')}
                            </div>
                          )}
                          {dept.consultations && dept.consultations.length > 0 && (
                            <div style={{ fontSize: '0.85rem', color: '#444', marginTop: '0.25rem' }}>
                              <strong>Consultations:</strong>
                              <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                                {dept.consultations.map((c, i) => (
                                  <li key={i}>{c.date} - {c.patient} with {doctors.find(doc => doc.id === c.doctorId)?.name || 'Doctor'}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </td>
                      <td>{dept.doctors ? dept.doctors.length : dept.doctors}</td>
                      <td>{dept.consultations ? dept.consultations.length : dept.consultations}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn btn-secondary" style={{ padding: '0.5rem' }} onClick={() => handleEditDepartment(dept)}>
                            <Edit size={16} />
                          </button>
                          <button className="btn btn-danger" style={{ padding: '0.5rem' }} onClick={() => handleDeleteDepartment(dept.id)}>
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
        {activeTab === 'doctors' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 className="mb-2">Associated Doctors</h3>
              <button className="btn btn-primary" onClick={() => setShowAddDoctor(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={16} /> Add Doctor
              </button>
            </div>
            {showAddDoctor && (
              <div className="card mb-3">
                <h4 className="mb-2">Add New Doctor</h4>
                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-input" value={newDoctor.name} onChange={e => setNewDoctor({ ...newDoctor, name: e.target.value })} required placeholder="Enter doctor's name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Specialization</label>
                    <input type="text" className="form-input" value={newDoctor.specialization} onChange={e => setNewDoctor({ ...newDoctor, specialization: e.target.value })} required placeholder="e.g., Cardiology" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Experience (years)</label>
                    <input type="number" className="form-input" value={newDoctor.experience} onChange={e => setNewDoctor({ ...newDoctor, experience: e.target.value })} required min="0" placeholder="Enter years of experience" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <select className="form-select" value={newDoctor.department} onChange={e => setNewDoctor({ ...newDoctor, department: e.target.value })} required>
                      <option value="">Select department</option>
                      {departments.map(dept => (
                        <option key={dept.id} value={dept.name}>{dept.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" value={newDoctor.email} onChange={e => setNewDoctor({ ...newDoctor, email: e.target.value })} placeholder="Enter email (optional)" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-input" value={newDoctor.phone} onChange={e => setNewDoctor({ ...newDoctor, phone: e.target.value })} placeholder="Enter phone (optional)" />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn btn-primary" onClick={handleAddDoctor}>Add Doctor</button>
                  <button className="btn btn-secondary" onClick={() => setShowAddDoctor(false)}>Cancel</button>
                </div>
              </div>
            )}
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Specialization</th>
                    <th>Experience</th>
                    <th>Consultations</th>
                    <th>Revenue Generated</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map(doctor => (
                    <tr key={doctor.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Stethoscope size={16} />
                          <strong>{doctor.name}</strong>
                        </div>
                      </td>
                      <td>{doctor.specialization}</td>
                      <td>{doctor.experience} years</td>
                      <td>{doctor.consultations}</td>
                      <td>₹{doctor.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        
        {activeTab === 'revenue' && (
          <div>
            <div className="grid grid-2">
              <div className="card">
                <h3 className="mb-2">Revenue Summary</h3>
                <div className="mb-2">
                  <strong>Total Revenue:</strong> ₹{totalRevenue.toLocaleString()}
                </div>
                <div className="mb-2">
                  <strong>Hospital Share (40%):</strong> ₹{(totalRevenue * 0.4).toLocaleString()}
                </div>
                <div className="mb-2">
                  <strong>Doctors Share (60%):</strong> ₹{(totalRevenue * 0.6).toLocaleString()}
                </div>
                <div className="mb-2">
                  <strong>Average per Consultation:</strong> ₹{(totalRevenue / totalConsultations).toFixed(0)}
                </div>
              </div>

              <div className="card">
                <h3 className="mb-2">Revenue by Department</h3>
                <div>
                  {departments.map(dept => {
                    const deptRevenue = doctors
                      .filter(doctor => doctor.department === dept.name)
                      .reduce((sum, doctor) => sum + doctor.revenue, 0)
                    return (
                      <div key={dept.id} className="mb-2">
                        <strong>{dept.name}:</strong> ₹{deptRevenue.toLocaleString()}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="card mt-3">
              <h3 className="mb-2">Revenue per Doctor</h3>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Doctor Name</th>
                      <th>Department</th>
                      <th>Consultations</th>
                      <th>Revenue Generated</th>
                      <th>Average per Consultation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map(doctor => (
                      <tr key={doctor.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Stethoscope size={16} />
                            <strong>{doctor.name}</strong>
                          </div>
                        </td>
                        <td>{doctor.department}</td>
                        <td>{doctor.consultations}</td>
                        <td>₹{doctor.revenue.toLocaleString()}</td>
                        <td>₹{(doctor.revenue / doctor.consultations).toFixed(0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card mt-3">
              <h3 className="mb-2">Monthly Revenue Trend</h3>
              <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <p style={{ color: '#666' }}>Revenue chart would be displayed here</p>
              </div>
            </div>
          </div>
        )}

    
        {activeTab === 'consultations' && (
          <div>
            <div className="grid grid-2">
              <div className="card">
                <h3 className="mb-2">Consultation Summary</h3>
                <div className="mb-2">
                  <strong>Total Consultations:</strong> {totalConsultations}
                </div>
                <div className="mb-2">
                  <strong>This Month:</strong> 45
                </div>
                <div className="mb-2">
                  <strong>Last Month:</strong> 38
                </div>
                <div className="mb-2">
                  <strong>Growth Rate:</strong> +18.4%
                </div>
              </div>

              <div className="card">
                <h3 className="mb-2">Consultations by Department</h3>
                <div>
                  {departments.map(dept => {
                    const deptConsultations = doctors
                      .filter(doctor => doctor.department === dept.name)
                      .reduce((sum, doctor) => sum + doctor.consultations, 0)
                    return (
                      <div key={dept.id} className="mb-2">
                        <strong>{dept.name}:</strong> {deptConsultations} consultations
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="card mt-3">
              <h3 className="mb-2">Recent Consultations</h3>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Patient</th>
                      <th>Doctor</th>
                      <th>Department</th>
                      <th>Fee</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2024-01-15</td>
                      <td>Jane Doe</td>
                      <td>Dr. John Smith</td>
                      <td>Cardiology</td>
                      <td>₹300</td>
                      <td><span className="badge badge-success">Completed</span></td>
                    </tr>
                    <tr>
                      <td>2024-01-15</td>
                      <td>John Smith</td>
                      <td>Dr. Sarah Johnson</td>
                      <td>Orthopedics</td>
                      <td>₹350</td>
                      <td><span className="badge badge-success">Completed</span></td>
                    </tr>
                    <tr>
                      <td>2024-01-14</td>
                      <td>Mike Wilson</td>
                      <td>Dr. Michael Brown</td>
                      <td>Pediatrics</td>
                      <td>₹250</td>
                      <td><span className="badge badge-warning">Scheduled</span></td>
                    </tr>
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

export default HospitalAdmin 