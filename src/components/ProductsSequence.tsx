import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products } from '../data/products'
import { ProductCard } from './ProductCard'

type Props = {
  unlocked: boolean
}

export function ProductsSequence({ unlocked }: Props) {
  return (
    <section className="products-section" id="products">
      <div className="container">
        <div className="products-header">
          <p className="eyebrow">
            {unlocked ? 'Swipe the row · farm products' : 'Finish the farm scroll first'}
          </p>
          <h2 className="section-title">From the farm, into your home.</h2>
          <p className="section-copy">
            Browse products in a horizontal row — swipe sideways to explore milk, powder, urine,
            0° fruits, and organic soil.
          </p>
        </div>
      </div>

      <div className={`products-fade-wrap${unlocked ? ' is-unlocked' : ''}`}>
        <div className="products-fade products-fade-left" aria-hidden="true" />
        <div className="products-fade products-fade-right" aria-hidden="true" />

        <div className="products-row-scroller" aria-label="Product row">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="products-row-item"
              initial={{ opacity: 0, x: 40 }}
              animate={
                unlocked
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0.35, x: 16 }
              }
              transition={{
                duration: 0.55,
                delay: unlocked ? index * 0.08 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ProductCard product={product} compact />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container" style={{ marginTop: '1.25rem' }}>
        <div className="action-row">
          <Link to="/shop" className="btn btn-primary">
            View all products
          </Link>
          <Link to="/order" className="btn btn-ghost">
            Place order
          </Link>
        </div>
      </div>
    </section>
  )
}
