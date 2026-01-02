import { useEffect } from 'react'

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  }[type] || 'bg-gray-500'

  const bgGradients = {
    success: 'from-green-500 to-emerald-600',
    error: 'from-red-500 to-rose-600',
    warning: 'from-yellow-500 to-orange-500',
    info: 'from-blue-500 to-cyan-600'
  }[type] || 'from-gray-500 to-gray-600'

  return (
    <div className="fixed top-4 right-4 left-4 md:left-auto z-50 animate-slide-down">
      <div className={`bg-gradient-to-r ${bgGradients} text-white px-6 py-4 luxury-rounded-lg luxury-shadow-lg flex items-center justify-between max-w-md mx-auto md:mx-0 backdrop-blur-sm border border-white/20`}>
        <span className="flex-1 font-semibold">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-100 transition-all duration-300 hover:scale-110 p-1 rounded-full hover:bg-white/20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Toast

