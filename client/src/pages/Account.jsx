import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import BottomNavigation from '../components/BottomNavigation'
import ProductCard from '../components/ProductCard'
import { useLanguage } from '../context/LanguageContext'
import { useWishlist } from '../context/WishlistContext'
import { useSettings } from '../context/SettingsContext'

const Account = () => {
  const { t } = useLanguage()
  const { wishlist } = useWishlist()
  const { settings } = useSettings()
  const [activeTab, setActiveTab] = useState('account')
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Header />
      
      <main className="container mx-auto px-4 py-6 md:py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">{t('myAccount')}</h1>
        
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('account')}
            className={`px-4 py-2 font-medium transition ${
              activeTab === 'account'
                ? 'border-b-2 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            style={activeTab === 'account' ? { borderColor: settings.primary_color || '#3B82F6' } : {}}
          >
            {t('myAccount')}
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-4 py-2 font-medium transition relative ${
              activeTab === 'wishlist'
                ? 'border-b-2 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            style={activeTab === 'wishlist' ? { borderColor: settings.primary_color || '#3B82F6' } : {}}
          >
            {t('wishlist')}
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>
        </div>

        {/* Account Tab */}
        {activeTab === 'account' && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">{t('welcome') || 'Welcome!'}</p>
              <p className="text-sm text-gray-500 mb-6">
                {t('accountDescription') || 'إدارة حسابك ومفضلاتك'}
              </p>
            </div>
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlist.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <p className="text-gray-500 text-lg mb-4">{t('emptyWishlist') || 'قائمة المفضلة فارغة'}</p>
                <Link
                  to="/shop"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  style={{ backgroundColor: settings.primary_color || '#3B82F6' }}
                >
                  {t('browseProducts') || 'تصفح المنتجات'}
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {wishlist.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  )
}

export default Account

