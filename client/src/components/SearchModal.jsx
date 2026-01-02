import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { useLanguage } from '../context/LanguageContext'
import { getImageUrl } from '../utils/config'

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [allProducts, setAllProducts] = useState([])
  const { language, t } = useLanguage()
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      fetchAllProducts()
    }
  }, [isOpen])

  const fetchAllProducts = async () => {
    try {
      const response = await api.get('/products')
      setAllProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  useEffect(() => {
    if (searchQuery.trim()) {
      setLoading(true)
      const filtered = allProducts.filter(product => {
        const name = language === 'ar' 
          ? (product.name_ar || product.name || '').toLowerCase()
          : (product.name || product.name_ar || '').toLowerCase()
        const description = language === 'ar'
          ? (product.description_ar || product.description || '').toLowerCase()
          : (product.description || product.description_ar || '').toLowerCase()
        const query = searchQuery.toLowerCase()
        return name.includes(query) || description.includes(query)
      })
      setProducts(filtered)
      setLoading(false)
    } else {
      setProducts([])
    }
  }, [searchQuery, allProducts, language])

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-start justify-center p-4" onClick={onClose}>
      <div className="bg-white luxury-rounded-lg luxury-shadow-xl w-full max-w-3xl mt-20" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder={t('searchProducts') || 'ابحث عن منتج...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 pr-4 border-2 border-gray-200 luxury-rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg font-medium"
                autoFocus
              />
              <div className="absolute left-5 top-1/2 -translate-y-1/2">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="p-8 text-center text-gray-500">
              {t('searching') || 'جاري البحث...'}
            </div>
          ) : products.length > 0 ? (
            <div className="divide-y">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="w-full p-4 hover:bg-gray-50 flex items-center space-x-4 space-x-reverse text-right"
                >
                  {product.image && (
                    <img
                      src={getImageUrl(product.image)}
                      alt={language === 'ar' ? (product.name_ar || product.name) : (product.name || product.name_ar)}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {language === 'ar' ? (product.name_ar || product.name) : (product.name || product.name_ar)}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {language === 'ar' 
                        ? (product.description_ar || product.description || '')
                        : (product.description || product.description_ar || '')}
                    </p>
                    <p className="text-sm font-bold mt-1" style={{ color: '#3B82F6' }}>
                      {parseFloat(product.price).toFixed(2)} {t('currency')}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : searchQuery.trim() ? (
            <div className="p-8 text-center text-gray-500">
              {t('noResults') || 'لا توجد نتائج'}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default SearchModal

