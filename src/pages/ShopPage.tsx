import { useMemo, useState } from 'react'
import { products } from '../data/products'
import { ProductCard } from '../components/ProductCard'

const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))]

export function ShopPage() {
  const [category, setCategory] = useState('All')

  const filtered = useMemo(
    () => (category === 'All' ? products : products.filter((p) => p.category === category)),
    [category],
  )

  return (
    <main className="page">
      <div className="container">
        <p className="eyebrow">Shop</p>
        <h1 className="section-title">All SBM products</h1>
        <p className="section-copy">
          Fresh milk, powder, collected urine, zero-degree fruits, and organic soil — browse, add to
          cart, and place your order.
        </p>

        <div className="filter-row" role="tablist" aria-label="Product categories">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`filter-chip${category === item ? ' active' : ''}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="shop-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  )
}
