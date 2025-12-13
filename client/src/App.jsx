import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Account from './pages/Account'
import ProductDetails from './pages/ProductDetails'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { SettingsProvider } from './context/SettingsContext'
import { LanguageProvider } from './context/LanguageContext'
import './App.css'

function App() {
  return (
    <SettingsProvider>
      <LanguageProvider>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <Routes>
            {/* Public Routes - للمتجر فقط */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Account />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            
            {/* Admin Routes - محمية */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Redirect any other admin routes to login */}
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </SettingsProvider>
  )
}

export default App

