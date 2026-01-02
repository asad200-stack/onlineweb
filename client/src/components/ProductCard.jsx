import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSettings } from '../context/SettingsContext'
import { useLanguage } from '../context/LanguageContext'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { useWishlist } from '../context/WishlistContext'
import { getImageUrl } from '../utils/config'
import { getProductPrices } from '../utils/productHelpers'

const ProductCard = ({ product }) => {
  const { settings } = useSettings()
  const { language, t } = useLanguage()
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const isLiked = isInWishlist(product.id)
  
  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
    showToast(t('productAddedToCart') || 'تم إضافة المنتج للسلة', 'success')
  }
  
  // Get product prices using helper function for discount percentage
  const { discountPercentage } = getProductPrices(product)
  
  // Simple check - EXACTLY same as admin panel
  const hasDiscountPrice = product.discount_price && 
                          product.discount_price !== null && 
                          product.discount_price !== undefined &&
                          product.discount_price !== '' &&
                          parseFloat(product.discount_price) > 0 &&
                          parseFloat(product.price) > 0 &&
                          parseFloat(product.discount_price) < parseFloat(product.price)

  return (
    <div className="bg-white luxury-rounded-lg luxury-shadow overflow-hidden card-hover relative group">
      {/* Like Button */}
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          toggleWishlist(product)
          showToast(
            isLiked 
              ? (t('removedFromWishlist') || 'تم إزالة المنتج من المفضلة')
              : (t('addedToWishlist') || 'تم إضافة المنتج للمفضلة'),
            'success'
          )
        }}
        className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
      >
        <svg 
          className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`}
          fill={isLiked ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          {product.image ? (
            <img
              src={getImageUrl(product.image)}
              alt={language === 'ar' ? (product.name_ar || product.name) : (product.name || product.name_ar)}
              className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-48 md:h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-gray-400">{t('noImage') || 'No Image'}</span>
            </div>
          )}
          {hasDiscountPrice && (
            <div 
              className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xl backdrop-blur-sm"
            >
              -{discountPercentage}%
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-base md:text-lg font-bold mb-3 text-gray-900 line-clamp-2 min-h-[3rem] leading-tight">
            {language === 'ar' ? (product.name_ar || product.name) : (product.name || product.name_ar)}
          </h3>
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-col">
              {hasDiscountPrice ? (
                <>
                  {/* السعر الأصلي (مشطوب) - يظهر أولاً */}
                  <span className="text-sm md:text-base text-gray-500 line-through mb-1">
                    {parseFloat(product.price).toFixed(2)} {t('currency')}
                  </span>
                  {/* السعر بعد الخصم (بالأخضر) - يظهر ثانياً */}
                  <span className="text-xl md:text-2xl font-bold text-green-600">
                    {parseFloat(product.discount_price).toFixed(2)} {t('currency')}
                  </span>
                </>
              ) : (
                <span className="text-xl md:text-2xl font-bold" style={{ color: settings.primary_color || '#3B82F6' }}>
                  {parseFloat(product.price).toFixed(2)} {t('currency')}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              to={`/product/${product.id}`}
              className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-300 text-sm md:text-base text-center luxury-shadow hover:shadow-lg"
            >
              {t('readMore')}
            </Link>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-gray-900 to-black text-white py-3 rounded-xl font-semibold hover:from-black hover:to-gray-800 transition-all duration-300 text-sm md:text-base luxury-btn luxury-shadow hover:shadow-xl"
            >
              {t('addToCart') || 'أضف للسلة'}
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard

