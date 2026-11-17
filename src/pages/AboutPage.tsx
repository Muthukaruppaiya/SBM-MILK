import { Link } from 'react-router-dom'

export function AboutPage() {
  return (
    <main className="page">
      <div className="container about-page">
        <p className="eyebrow">About</p>
        <h1 className="section-title">SBM Donkey Farm</h1>
        <p className="section-copy">
          We raise and care for donkeys with a simple promise: pure milk products, honest packaging,
          zero-degree fruit cold chain, and living soil returned to the land.
        </p>

        <div className="about-grid" style={{ marginTop: '2rem' }}>
          <div className="about-panel">
            <h3>Farm first, always.</h3>
            <p>
              Every bottle, pouch, crate, and sack starts on the farm — collected, dried, cooled, or
              composted with the same careful hand.
            </p>
          </div>
          <div>
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
            <p className="section-copy" style={{ marginTop: '1.5rem' }}>
              This site is the full static storefront. Inventory, payments, and delivery tracking
              will connect in the backend phase.
            </p>
            <Link to="/shop" className="btn btn-primary">
              Shop products
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
