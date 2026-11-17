import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { count } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}${open ? ' menu-open' : ''}`}>
      <div className="container nav">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-mark">SBM</span>
          <span className="brand-text">
            <strong>SBM Donkey Farm</strong>
            <span>Nature first</span>
          </span>
        </Link>

        <div className="nav-actions">
          <Link to="/cart" className="nav-cart-chip" onClick={close} aria-label="Open cart">
            Cart
            {count > 0 ? <span className="nav-cart-count">{count}</span> : null}
          </Link>

          <button
            type="button"
            className={`nav-toggle${open ? ' is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav-toggle-bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="nav-toggle-label">{open ? 'Close' : 'Menu'}</span>
          </button>
        </div>

        <button
          type="button"
          className={`nav-backdrop${open ? ' open' : ''}`}
          aria-label="Close menu"
          onClick={close}
        />

        <nav className={`nav-drawer${open ? ' open' : ''}`} aria-label="Main">
          <div className="nav-drawer-head">
            <span className="brand-mark">SBM</span>
            <div>
              <strong>SBM Donkey Farm</strong>
              <p>Shop milk, fruits & farm goods</p>
            </div>
          </div>

          <ul className="nav-links">
            <li>
              <NavLink to="/" end onClick={close}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop" onClick={close}>
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={close}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={close}>
                Contact
              </NavLink>
            </li>
            <li className="mobile-only-link">
              <NavLink to="/cart" onClick={close}>
                Cart{count > 0 ? ` · ${count} items` : ''}
              </NavLink>
            </li>
            <li className="desktop-only-link">
              <NavLink to="/cart" onClick={close}>
                Cart{count > 0 ? ` (${count})` : ''}
              </NavLink>
            </li>
            <li className="desktop-only-link">
              <Link to="/order" className="btn btn-primary" onClick={close}>
                Order
              </Link>
            </li>
          </ul>

          <div className="nav-drawer-foot">
            <Link to="/order" className="btn btn-primary nav-order-btn" onClick={close}>
              Place order
            </Link>
            <Link to="/shop" className="btn btn-ghost" onClick={close}>
              Browse products
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
