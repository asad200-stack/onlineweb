// API and Image URLs configuration
const API_URL = import.meta.env.VITE_API_URL || ''

// In production, use current origin (same domain). In development, use localhost:5000
const getBackendUrl = () => {
  if (import.meta.env.PROD) {
    // In production, backend and frontend are on same domain
    return window.location.origin
  }
  return import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
}

const BACKEND_URL = getBackendUrl()

export const getImageUrl = (path) => {
  if (!path) return null
  if (path.startsWith('http')) return path
  // In production, images are served from /uploads relative to the current origin
  return `${BACKEND_URL}${path}`
}

export const getApiUrl = () => API_URL || '/api'

export default {
  API_URL,
  BACKEND_URL,
  getImageUrl,
  getApiUrl
}


