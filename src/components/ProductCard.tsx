import { Link } from 'react-router-dom'
import { formatPrice, type Product } from '../data/products'
import { useCart } from '../context/CartContext'

type Props = {
  product: Product
  compact?: boolean
}

export function ProductCard({ product, compact = false }: Props) {
  const { addItem } = useCart()

  return (
    <article className={`shop-card${compact ? ' shop-card-compact' : ''}`}>
      <Link to={`/product/${product.id}`} className="shop-card-media">
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>
      <div className="shop-card-body">
        {!compact ? (
          <p className="eyebrow" style={{ marginBottom: '0.35rem' }}>
            {product.category}
          </p>
        ) : null}
        <h3>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        {!compact ? <p>{product.tagline}</p> : null}
        <div className="product-meta">
          <div className="shop-card-price-block">
            <span className="price">{formatPrice(product.price)}</span>
            {compact && product.volume ? <span className="volume">{product.volume}</span> : null}
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => addItem(product.id, 1)}
            aria-label={`Add ${product.name} to cart`}
          >
            {compact ? 'Add' : 'Add to cart'}
          </button>
        </div>
      </div>
    </article>
  )
}
