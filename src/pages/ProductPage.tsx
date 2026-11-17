import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { formatPrice, getProduct, products } from '../data/products'
import { useCart } from '../context/CartContext'
import { ProductCard } from '../components/ProductCard'

export function ProductPage() {
  const { id } = useParams()
  const product = getProduct(id ?? '')
  const { addItem } = useCart()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)

  const related = useMemo(
    () => products.filter((item) => item.id !== product?.id),
    [product?.id],
  )

  if (!product) {
    return (
      <main className="page">
        <div className="container">
          <h1 className="section-title">Product not found</h1>
          <Link to="/shop" className="btn btn-primary">
            Back to shop
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="page">
      <div className="container">
        <p className="breadcrumb">
          <Link to="/shop">Shop</Link> / <span>{product.name}</span>
        </p>

        <div className="product-detail">
          <div className="product-detail-media">
            <div className="product-media-tags">
              <span className="tag tag-dark">{product.badge}</span>
              <span className="tag tag-light">Product {product.number}</span>
            </div>
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-copy">
            <p className="eyebrow">{product.category}</p>
            <h1 className="section-title" style={{ marginTop: 0 }}>
              {product.name}
            </h1>
            <p className="tagline">{product.tagline}</p>
            <p className="section-copy">{product.longDescription}</p>

            <ul className="feature-list">
              {product.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <div className="product-meta" style={{ marginBottom: '1.25rem' }}>
              <span className="price">{formatPrice(product.price)}</span>
              {product.volume ? <span className="volume">{product.volume}</span> : null}
              <span className="stock-pill">{product.inStock ? 'In stock' : 'Out of stock'}</span>
            </div>

            <div className="qty-row">
              <label htmlFor="qty">Qty</label>
              <div className="qty-controls">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  −
                </button>
                <input
                  id="qty"
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                />
                <button type="button" onClick={() => setQty((q) => q + 1)}>
                  +
                </button>
              </div>
            </div>

            <div className="action-row">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => addItem(product.id, qty)}
              >
                Add to cart
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  addItem(product.id, qty)
                  navigate('/order')
                }}
              >
                Buy now
              </button>
            </div>
          </div>
        </div>

        <section className="related-section">
          <div className="related-head">
            <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
              You may also like
            </h2>
            <p className="related-hint">Swipe sideways</p>
          </div>
          <div className="related-scroller" aria-label="Suggested products">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} compact />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
