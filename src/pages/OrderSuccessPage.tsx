import { Link, useParams } from 'react-router-dom'
import { formatPrice } from '../data/products'

type SavedOrder = {
  id: string
  createdAt: string
  customer: { name: string; phone: string; city: string }
  items: Array<{ name: string; quantity: number; price: number; image: string }>
  total: number
  status: string
}

function readOrder(id: string): SavedOrder | null {
  try {
    const raw = localStorage.getItem('sbm-last-order')
    if (!raw) return null
    const order = JSON.parse(raw) as SavedOrder
    return order.id === id ? order : null
  } catch {
    return null
  }
}

export function OrderSuccessPage() {
  const { orderId } = useParams()
  const order = orderId ? readOrder(orderId) : null

  return (
    <main className="page">
      <div className="container narrow">
        <p className="eyebrow">Order confirmed</p>
        <h1 className="section-title">Thank you{order ? `, ${order.customer.name}` : ''}.</h1>
        <p className="section-copy">
          Your order is recorded in this wireframe. When the backend is live, this will trigger farm
          packing and cold-chain delivery.
        </p>

        {order ? (
          <div className="success-card">
            <div className="summary-row">
              <span>Order ID</span>
              <strong>{order.id}</strong>
            </div>
            <div className="summary-row">
              <span>Status</span>
              <strong>{order.status}</strong>
            </div>
            <div className="summary-row">
              <span>Phone</span>
              <strong>{order.customer.phone}</strong>
            </div>
            <div className="summary-row">
              <span>City</span>
              <strong>{order.customer.city}</strong>
            </div>
            <hr />
            {order.items.map((item) => (
              <div key={`${item.name}-${item.quantity}`} className="summary-product">
                <img src={item.image} alt="" />
                <div>
                  <strong>{item.name}</strong>
                  <p>
                    {item.quantity} × {formatPrice(item.price)}
                  </p>
                </div>
              </div>
            ))}
            <div className="summary-row total">
              <span>Total paid later / COD</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <p>We could not find that order in local storage.</p>
          </div>
        )}

        <div className="action-row" style={{ marginTop: '1.5rem' }}>
          <Link to="/shop" className="btn btn-primary">
            Continue shopping
          </Link>
          <Link to="/" className="btn btn-ghost">
            Back home
          </Link>
        </div>
      </div>
    </main>
  )
}
