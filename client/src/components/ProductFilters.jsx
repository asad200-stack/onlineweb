import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const ProductFilters = ({ products, onFilterChange }) => {
  const { t, language } = useLanguage()
  const [sortBy, setSortBy] = useState('newest')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [showDiscountOnly, setShowDiscountOnly] = useState(false)

  const handleSortChange = (value) => {
    setSortBy(value)
    applyFilters(value, priceRange, showDiscountOnly)
  }

  const handlePriceChange = (type, value) => {
    const newRange = { ...priceRange, [type]: value }
    setPriceRange(newRange)
    applyFilters(sortBy, newRange, showDiscountOnly)
  }

  const handleDiscountToggle = (checked) => {
    setShowDiscountOnly(checked)
    applyFilters(sortBy, priceRange, checked)
  }

  const applyFilters = (sort, price, discount) => {
    let filtered = [...products]

    // Filter by discount
    if (discount) {
      filtered = filtered.filter(product => {
        return product.discount_price && 
               parseFloat(product.discount_price) > 0 && 
               parseFloat(product.discount_price) < parseFloat(product.price)
      })
    }

    // Filter by price range
    if (price.min) {
      filtered = filtered.filter(p => parseFloat(p.price) >= parseFloat(price.min))
    }
    if (price.max) {
      filtered = filtered.filter(p => parseFloat(p.price) <= parseFloat(price.max))
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sort) {
        case 'price-low':
          return parseFloat(a.price) - parseFloat(b.price)
        case 'price-high':
          return parseFloat(b.price) - parseFloat(a.price)
        case 'newest':
          return new Date(b.created_at) - new Date(a.created_at)
        case 'oldest':
          return new Date(a.created_at) - new Date(b.created_at)
        case 'name':
          const nameA = language === 'ar' ? (a.name_ar || a.name) : (a.name || a.name_ar)
          const nameB = language === 'ar' ? (b.name_ar || b.name) : (b.name || b.name_ar)
          return nameA.localeCompare(nameB)
        default:
          return 0
      }
    })

    onFilterChange(filtered)
  }

  const clearFilters = () => {
    setSortBy('newest')
    setPriceRange({ min: '', max: '' })
    setShowDiscountOnly(false)
    onFilterChange(products)
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm luxury-rounded-lg luxury-shadow p-5 mb-8 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        {/* Sort */}
        <div className="flex items-center gap-3">
          <label className="font-bold text-gray-800 whitespace-nowrap">
            {t('sortBy') || 'ترتيب حسب:'}
          </label>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-5 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 font-semibold luxury-shadow"
          >
            <option value="newest">{t('newest') || 'الأحدث'}</option>
            <option value="oldest">{t('oldest') || 'الأقدم'}</option>
            <option value="price-low">{t('priceLowToHigh') || 'السعر: منخفض إلى مرتفع'}</option>
            <option value="price-high">{t('priceHighToLow') || 'السعر: مرتفع إلى منخفض'}</option>
            <option value="name">{t('name') || 'الاسم'}</option>
          </select>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Price Range */}
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder={t('minPrice') || 'أقل سعر'}
              value={priceRange.min}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              className="w-28 px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 font-semibold luxury-shadow"
            />
            <span className="text-gray-500 font-bold">-</span>
            <input
              type="number"
              placeholder={t('maxPrice') || 'أعلى سعر'}
              value={priceRange.max}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              className="w-28 px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 font-semibold luxury-shadow"
            />
          </div>

          {/* Discount Only */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={showDiscountOnly}
              onChange={(e) => handleDiscountToggle(e.target.checked)}
              className="w-5 h-5 text-purple-600 rounded-lg focus:ring-purple-500 cursor-pointer transition-all"
            />
            <span className="text-sm font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">{t('discountOnly') || 'عروض فقط'}</span>
          </label>

          {/* Clear Filters */}
          {(priceRange.min || priceRange.max || showDiscountOnly) && (
            <button
              onClick={clearFilters}
              className="px-5 py-2.5 text-sm font-bold text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 luxury-shadow"
            >
              {t('clearFilters') || 'مسح الفلاتر'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductFilters

