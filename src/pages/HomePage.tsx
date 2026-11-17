import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollVideoStory } from '../components/ScrollVideoStory'
import { ProductsSequence } from '../components/ProductsSequence'

export function HomePage() {
  const [storyComplete, setStoryComplete] = useState(false)
  const handleComplete = useCallback((complete: boolean) => {
    setStoryComplete(complete)
  }, [])

  return (
    <>
      <ScrollVideoStory onCompleteChange={handleComplete} />
      <ProductsSequence unlocked={storyComplete} />

      <section className="about-section" id="about">
        <div className="container about-grid">
          <div>
            <p className="eyebrow">The farm</p>
            <h2 className="section-title">Raised with care. Packed with honesty.</h2>
            <p className="section-copy">
              SBM Donkey Farm brings premium donkey milk products and zero-degree fruits from a
              single trusted source. This React build is the static wireframe — checkout and
              inventory will plug in when the backend is ready.
            </p>
            <div className="stat-row">
              <div className="stat">
                <strong>5</strong>
                <span>Core products</span>
              </div>
              <div className="stat">
                <strong>0°</strong>
                <span>Fruit cold chain</span>
              </div>
              <div className="stat">
                <strong>99.9%</strong>
                <span>Purity focus</span>
              </div>
            </div>
          </div>

          <div className="about-panel">
            <h3>Farm to pouch, glass, and garden.</h3>
            <p>
              Milk and powder for wellness, collected urine for traditional use, cold fruits for the
              table, and organic soil for the next harvest.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <Link to="/about" className="btn btn-ghost" style={{ color: 'var(--cream)', borderColor: 'rgba(247,244,236,0.35)' }}>
                About the farm
              </Link>
              <Link to="/shop" className="btn btn-primary">
                Shop all
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="container">
          <div className="cta-band">
            <div>
              <p className="eyebrow">Ready to order?</p>
              <h2 className="section-title" style={{ color: 'var(--cream)' }}>
                Cart, checkout, and confirmation are live on this storefront.
              </h2>
            </div>
            <div className="action-row">
              <Link to="/order" className="btn btn-primary" style={{ background: 'var(--gold)', color: 'var(--forest-deep)' }}>
                Place order
              </Link>
              <Link to="/contact" className="btn btn-ghost" style={{ color: 'var(--cream)', borderColor: 'rgba(247,244,236,0.35)' }}>
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
