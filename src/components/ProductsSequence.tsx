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
            {unlocked ? 'Our products' : 'Finish the farm scroll first'}
          </p>
          <h2 className="section-title">From the farm, into your home.</h2>
          <p className="section-copy">
            Fresh milk, powder, urine, zero-degree fruits, and organic soil — pick what you need.
          </p>
        </div>

        <div className={`products-grid-2${unlocked ? ' is-unlocked' : ''}`}>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              animate={unlocked ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 12 }}
              transition={{
                duration: 0.45,
                delay: unlocked ? index * 0.06 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <div className="action-row" style={{ marginTop: '1.5rem' }}>
          <Link to="/shop" className="btn btn-ghost">
            View shop
          </Link>
        </div>
      </div>
    </section>
  )
}
