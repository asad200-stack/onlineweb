import { useState, useEffect } from 'react'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import BottomNavigation from '../components/BottomNavigation'
import SkeletonLoader from '../components/SkeletonLoader'
import ProductFilters from '../components/ProductFilters'
import api from '../utils/api'
import { useSettings } from '../context/SettingsContext'
import { useLanguage } from '../context/LanguageContext'

const Shop = () => {
  const [allProducts, setAllProducts] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { settings } = useSettings()
  const { t } = useLanguage()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products')
      setAllProducts(response.data)
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (filteredProducts) => {
    setProducts(filteredProducts)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 pb-20 md:pb-0">
      <Header />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tight" style={{ color: settings.primary_color || '#3B82F6' }}>
            {t('products')}
          </h1>
          <p className="text-gray-600 text-lg font-medium">{t('discoverProducts')}</p>
        </div>

        {!loading && allProducts.length > 0 && (
          <ProductFilters products={allProducts} onFilterChange={handleFilterChange} />
        )}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <SkeletonLoader count={8} />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">{t('noProducts')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  )
}

export default Shop

