import { useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { formatPrice, getProduct, products } from '../data/products'
import { useCart } from '../context/CartContext'

type FormState = {
  name: string
  phone: string
  email: string
  address: string
  city: string
  pincode: string
  notes: string
  payment: 'cod' | 'upi'
}

const emptyForm: FormState = {
  name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  pincode: '',
  notes: '',
  payment: 'cod',
}

export function OrderPage() {
  const { items, subtotal, shipping, total, clearCart, addItem } = useCart()
  const [form, setForm] = useState<FormState>(emptyForm)
  const navigate = useNavigate()

  const lines = useMemo(
    () =>
      items
        .map((item) => {
          const product = getProduct(item.productId)
          return product ? { ...item, product } : null
        })
        .filter(Boolean) as Array<{ productId: string; quantity: number; product: NonNullable<ReturnType<typeof getProduct>> }>,
    [items],
  )

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (lines.length === 0) return

    const orderId = `SBM-${Date.now().toString().slice(-8)}`
    const order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer: form,
      items: lines.map((line) => ({
        id: line.product.id,
        name: line.product.name,
        quantity: line.quantity,
        price: line.product.price,
        image: line.product.image,
      })),
      subtotal,
      shipping,
      total,
      status: 'Placed',
    }

    localStorage.setItem('sbm-last-order', JSON.stringify(order))
    clearCart()
    navigate(`/order-success/${orderId}`)
  }

  return (
    <main className="page">
      <div className="container">
        <p className="eyebrow">Checkout</p>
        <h1 className="section-title">Place your order</h1>
        <p className="section-copy">
          Static order form for the wireframe. Details save locally until the backend is connected.
        </p>

        {lines.length === 0 ? (
          <div className="empty-state">
            <p className="section-copy">Add products before placing an order.</p>
            <div className="action-row">
              <Link to="/shop" className="btn btn-primary">
                Go to shop
              </Link>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => addItem(products[0].id, 1)}
              >
                Quick-add fresh milk
              </button>
            </div>
          </div>
        ) : (
          <div className="checkout-layout">
            <form className="checkout-form" onSubmit={onSubmit}>
              <h2>Delivery details</h2>
              <div className="form-grid">
                <label>
                  Full name
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </label>
                <label>
                  Phone / WhatsApp
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </label>
                <label className="full">
                  Email
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </label>
                <label className="full">
                  Address
                  <textarea
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />
                </label>
                <label>
                  City
                  <input
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </label>
                <label>
                  Pincode
                  <input
                    required
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  />
                </label>
                <label className="full">
                  Order notes
                  <textarea
                    placeholder="Preferred delivery time, landmark, cold-chain notes"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  />
                </label>
              </div>

              <h2>Payment</h2>
              <div className="payment-options">
                <label className={form.payment === 'cod' ? 'active' : ''}>
                  <input
                    type="radio"
                    name="payment"
                    checked={form.payment === 'cod'}
                    onChange={() => setForm({ ...form, payment: 'cod' })}
                  />
                  Cash on delivery
                </label>
                <label className={form.payment === 'upi' ? 'active' : ''}>
                  <input
                    type="radio"
                    name="payment"
                    checked={form.payment === 'upi'}
                    onChange={() => setForm({ ...form, payment: 'upi' })}
                  />
                  UPI (wireframe)
                </label>
              </div>

              <button type="submit" className="btn btn-primary">
                Confirm order · {formatPrice(total)}
              </button>
            </form>

            <aside className="cart-summary">
              <h2>Your items</h2>
              {lines.map((line) => (
                <div key={line.productId} className="summary-product">
                  <img src={line.product.image} alt="" />
                  <div>
                    <strong>{line.product.name}</strong>
                    <p>
                      {line.quantity} × {formatPrice(line.product.price)}
                    </p>
                  </div>
                </div>
              ))}
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <Link to="/cart" className="btn btn-ghost" style={{ width: '100%' }}>
                Edit cart
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}
