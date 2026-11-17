import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <strong>SBM Donkey Farm</strong>
          <p>Premium donkey milk, cold fruits, and farm inputs — static storefront ready for backend.</p>
        </div>
        <div>
          <strong>Shop</strong>
          <Link to="/shop">All products</Link>
          <Link to="/product/fresh-donkey-milk">Fresh milk</Link>
          <Link to="/product/zero-degree-fruits">0° fruits</Link>
          <Link to="/cart">Cart</Link>
        </div>
        <div>
          <strong>Help</strong>
          <Link to="/order">Place order</Link>
          <Link to="/about">About farm</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <div className="container footer-inner" style={{ marginTop: '1.5rem' }}>
        <div>Milk · Powder · Urine · 0° Fruits · Organic Soil</div>
        <div>© {new Date().getFullYear()} SBM Donkey Farm</div>
      </div>
    </footer>
  )
}
