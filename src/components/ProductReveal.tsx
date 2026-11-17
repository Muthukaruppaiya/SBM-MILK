import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { formatPrice, type Product } from '../data/products'
import { useCart } from '../context/CartContext'

type Props = {
  product: Product
  index: number
  enabled: boolean
}

export function ProductReveal({ product, index, enabled }: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: 0.3, once: true })
  const show = enabled && inView
  const { addItem } = useCart()

  return (
    <motion.article
      ref={ref}
      className="product-reveal"
      initial={{ opacity: 0, y: 80, scale: 0.98 }}
      animate={
        show
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: enabled ? 0.25 : 0.12, y: 56, scale: 0.99 }
      }
      transition={{
        duration: 0.75,
        delay: show ? Math.min(index * 0.1, 0.3) : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link to={`/product/${product.id}`} className="product-media">
        <div className="product-media-tags">
          <span className="tag tag-dark">{product.badge}</span>
          <span className="tag tag-light">Product {product.number}</span>
        </div>
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>

      <div className="product-copy">
        <div className="number">Product {product.number}</div>
        <h2>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h2>
        <p className="tagline">{product.tagline}</p>
        <p>{product.description}</p>
        <ul className="feature-list">
          {product.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <div className="product-meta">
          <span className="price">{formatPrice(product.price)}</span>
          {product.volume ? <span className="volume">{product.volume}</span> : null}
          <button type="button" className="btn btn-primary" onClick={() => addItem(product.id, 1)}>
            Add to cart
          </button>
          <Link to={`/product/${product.id}`} className="btn btn-ghost">
            View
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
