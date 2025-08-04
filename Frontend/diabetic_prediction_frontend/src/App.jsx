import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import PredictionForm from './Components/PredictionForm.jsx'
import backgroundImage from './assets/new2.jpg'
import './App.css'

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat blur-sm -z-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${backgroundImage})`
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10">
        <PredictionForm />
      </div>
    </div>
  )
}

export default App