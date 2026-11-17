import { Link, useNavigate } from 'react-router-dom'
import { formatPrice, type Product } from '../data/products'
import { useCart } from '../context/CartContext'

type Props = {
  product: Product
  compact?: boolean
}

export function ProductCard({ product, compact = false }: Props) {
  const { addItem } = useCart()
  const navigate = useNavigate()

  return (
    <article className={`shop-card${compact ? ' shop-card-compact' : ''} shop-card-grid`}>
      <Link to={`/product/${product.id}`} className="shop-card-media">
        <span className="shop-card-badge">{product.badge}</span>
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>
      <div className="shop-card-body">
        <h3>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        {!compact ? <p className="shop-card-tagline">{product.tagline}</p> : null}
        <div className="shop-card-price-row">
          <span className="price">{formatPrice(product.price)}</span>
          {product.volume ? <span className="volume">{product.volume}</span> : null}
        </div>
        <button
          type="button"
          className="btn btn-primary shop-card-buy"
          onClick={() => {
            addItem(product.id, 1)
            navigate('/order')
          }}
        >
          Buy now
        </button>
      </div>
    </article>
  )
}
