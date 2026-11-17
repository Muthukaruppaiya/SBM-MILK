import { products } from '../data/products'
import { ProductReveal } from './ProductReveal'

type Props = {
  unlocked: boolean
}

export function ProductsSequence({ unlocked }: Props) {
  return (
    <section className="products-section" id="products">
      <div className="container">
        <div className="products-header">
          <p className="eyebrow">
            {unlocked ? 'Story complete · products reveal one by one' : 'Finish the farm scroll first'}
          </p>
          <h2 className="section-title">From the farm, into your home.</h2>
          <p className="section-copy">
            After the video scroll ends, keep scrolling — each product steps in on its own:
            fresh milk, powder, urine, zero-degree fruits, and organic soil.
          </p>
        </div>

        <div className="products-rail">
          {products.map((product, index) => (
            <ProductReveal
              key={product.id}
              product={product}
              index={index}
              enabled={unlocked}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
