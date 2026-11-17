import { Link } from 'react-router-dom'
import { FREE_SHIPPING_FROM, formatPrice, getProduct } from '../data/products'
import { useCart } from '../context/CartContext'

export function CartPage() {
  const { items, setQuantity, removeItem, subtotal, shipping, total } = useCart()

  return (
    <main className="page">
      <div className="container">
        <p className="eyebrow">Cart</p>
        <h1 className="section-title">Your bag</h1>

        {items.length === 0 ? (
          <div className="empty-state">
            <p className="section-copy">Your cart is empty. Add milk, fruits, or farm products to continue.</p>
            <Link to="/shop" className="btn btn-primary">
              Browse shop
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-lines">
              {items.map((item) => {
                const product = getProduct(item.productId)
                if (!product) return null
                return (
                  <article key={item.productId} className="cart-line">
                    <Link to={`/product/${product.id}`} className="cart-thumb">
                      <img src={product.image} alt={product.name} />
                    </Link>
                    <div className="cart-line-body">
                      <h3>
                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                      </h3>
                      <p>{product.volume}</p>
                      <div className="cart-line-actions">
                        <div className="qty-controls">
                          <button
                            type="button"
                            onClick={() => setQuantity(product.id, item.quantity - 1)}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => setQuantity(product.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="link-btn"
                          onClick={() => removeItem(product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <strong>{formatPrice(product.price * item.quantity)}</strong>
                  </article>
                )
              })}
            </div>

            <aside className="cart-summary">
              <h2>Order summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              {subtotal < FREE_SHIPPING_FROM ? (
                <p className="summary-note">
                  Add {formatPrice(FREE_SHIPPING_FROM - subtotal)} more for free shipping.
                </p>
              ) : (
                <p className="summary-note">You unlocked free shipping.</p>
              )}
              <div className="summary-row total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <Link to="/order" className="btn btn-primary" style={{ width: '100%' }}>
                Proceed to order
              </Link>
              <Link to="/shop" className="btn btn-ghost" style={{ width: '100%' }}>
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}
