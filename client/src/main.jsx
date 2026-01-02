import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './styles/holiday-themes.css'

// Make toast available globally for admin components
if (typeof window !== 'undefined') {
  window.showToast = null
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


