import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'  
import BookingPage from './page/booking'
function App() {
  return (
    <Router>
      <Routes>  
        <Route path='/' element={<BookingPage />} /> 
      </Routes>
    </Router>
  )
}

export default App
