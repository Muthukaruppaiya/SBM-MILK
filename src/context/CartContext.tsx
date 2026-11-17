import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { FREE_SHIPPING_FROM, SHIPPING_FEE, getProduct } from '../data/products'

export type CartItem = {
  productId: string
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  count: number
  subtotal: number
  shipping: number
  total: number
  addItem: (productId: string, quantity?: number) => void
  removeItem: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'sbm-cart-v1'

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartItem[]
    return Array.isArray(parsed) ? parsed.filter((item) => getProduct(item.productId)) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() =>
    typeof window === 'undefined' ? [] : loadCart(),
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const value = useMemo<CartContextValue>(() => {
    const enriched = items
      .map((item) => {
        const product = getProduct(item.productId)
        return product ? { ...item, product } : null
      })
      .filter(Boolean) as Array<CartItem & { product: NonNullable<ReturnType<typeof getProduct>> }>

    const subtotal = enriched.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE
    const count = enriched.reduce((sum, item) => sum + item.quantity, 0)

    return {
      items,
      count,
      subtotal,
      shipping,
      total: subtotal + shipping,
      addItem: (productId, quantity = 1) => {
        setItems((prev) => {
          const existing = prev.find((item) => item.productId === productId)
          if (existing) {
            return prev.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            )
          }
          return [...prev, { productId, quantity }]
        })
      },
      removeItem: (productId) => {
        setItems((prev) => prev.filter((item) => item.productId !== productId))
      },
      setQuantity: (productId, quantity) => {
        setItems((prev) => {
          if (quantity <= 0) return prev.filter((item) => item.productId !== productId)
          return prev.map((item) =>
            item.productId === productId ? { ...item, quantity } : item,
          )
        })
      },
      clearCart: () => setItems([]),
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
