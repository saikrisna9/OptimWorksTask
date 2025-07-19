import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'


import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import HospitalAdmin from './pages/HospitalAdmin'
import Doctor from './pages/Doctor'
import Patient from './pages/Patient'
import Login from './pages/Login'
import Register from './pages/Register'


import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/hospital-admin" element={<HospitalAdmin />} />
              <Route path="/doctor" element={<Doctor />} />
              <Route path="/patient" element={<Patient />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

