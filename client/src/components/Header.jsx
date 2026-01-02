import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSettings } from '../context/SettingsContext'
import { useLanguage } from '../context/LanguageContext'
import { useCart } from '../context/CartContext'
import { getImageUrl } from '../utils/config'
import SearchModal from './SearchModal'
import CountrySelector from './CountrySelector'

const Header = () => {
  const { settings } = useSettings()
  const { language, changeLanguage, t } = useLanguage()
  const { getCartCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-red-600 to-red-700 sticky top-0 z-50 shadow-xl">
      <div className="container mx-auto px-4">
        {/* Top Bar - Ishtari Style */}
        <div className="flex items-center justify-between py-4 gap-4">
          {/* Logo */}
          <div className="flex items-center space-x-4 space-x-reverse flex-shrink-0">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link to="/" className="flex items-center space-x-2 space-x-reverse">
              {settings.logo ? (
                <img 
                  src={getImageUrl(settings.logo)} 
                  alt={settings.store_name}
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <div 
                  className="text-2xl md:text-3xl font-black text-white tracking-tight"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {settings.store_name || 'متجري الإلكتروني'}
                </div>
              )}
            </Link>
            {/* Country Selector */}
            <div className="hidden md:block">
              <CountrySelector />
            </div>
          </div>
          
          {/* Search Bar - Large in Center (Ishtari Style) */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder={t('searchProducts') || 'ابحث عن منتج...'}
                onClick={() => setSearchOpen(true)}
                readOnly
                className="w-full px-6 py-3 pl-14 pr-4 bg-white rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg text-lg font-medium"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Right Icons */}
          <div className="flex items-center space-x-3 space-x-reverse flex-shrink-0">
            {/* Mobile Search */}
            <button 
              onClick={() => setSearchOpen(true)}
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            {/* Menu Dots */}
            <button className="hidden lg:block text-white p-2 rounded-lg hover:bg-white/20 transition-all duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </button>
            
            {/* Separator */}
            <div className="hidden lg:block w-px h-8 bg-white/30"></div>
            
            {/* Cart */}
            <Link to="/cart" className="relative text-white p-2 rounded-lg hover:bg-white/20 transition-all duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg border-2 border-red-600">
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-white/20 bg-white/5 backdrop-blur-sm">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-white hover:text-white/90 font-semibold px-4 py-2 rounded-lg hover:bg-white/10">
                {t('home')}
              </Link>
              <Link to="/shop" className="text-white hover:text-white/90 font-semibold px-4 py-2 rounded-lg hover:bg-white/10">
                {t('shop')}
              </Link>
              <Link to="/admin/login" className="text-white hover:text-white/90 font-semibold px-4 py-2 rounded-lg hover:bg-white/10">
                {t('admin')}
              </Link>
              <button
                onClick={() => changeLanguage(language === 'ar' ? 'en' : 'ar')}
                className="flex items-center space-x-2 space-x-reverse text-white hover:text-white/90 font-semibold text-right px-4 py-2 rounded-lg hover:bg-white/10"
              >
                <span>{language === 'ar' ? 'English' : 'العربية'}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </button>
            </nav>
          </div>
        )}

        {/* Desktop Menu - White Background */}
        <nav className="hidden md:flex items-center justify-center space-x-8 space-x-reverse py-3 bg-white/10 backdrop-blur-sm">
          <Link 
            to="/" 
            className="text-white hover:text-white/90 font-semibold transition-all duration-300 relative group px-4 py-2 rounded-lg hover:bg-white/10"
          >
            {t('home')}
          </Link>
          <Link 
            to="/shop" 
            className="text-white hover:text-white/90 font-semibold transition-all duration-300 relative group px-4 py-2 rounded-lg hover:bg-white/10"
          >
            {t('shop')}
          </Link>
          <Link 
            to="/admin/login" 
            className="text-white hover:text-white/90 font-semibold transition-all duration-300 relative group px-4 py-2 rounded-lg hover:bg-white/10"
          >
            {t('admin')}
          </Link>
          <button
            onClick={() => changeLanguage(language === 'ar' ? 'en' : 'ar')}
            className="flex items-center space-x-2 space-x-reverse text-white hover:text-white/90 font-semibold transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/10"
          >
            <span>{language === 'ar' ? 'EN' : 'AR'}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </button>
        </nav>
      </div>
      
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}

export default Header

