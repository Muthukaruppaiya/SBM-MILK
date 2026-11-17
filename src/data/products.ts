export type Product = {
  id: string
  number: string
  name: string
  tagline: string
  category: string
  badge: string
  volume?: string
  price: number
  description: string
  longDescription: string
  image: string
  gallery: string[]
  features: string[]
  inStock: boolean
}

export const products: Product[] = [
  {
    id: 'fresh-donkey-milk',
    number: '01',
    name: 'Fresh Donkey Milk',
    tagline: 'Daily farm-fresh purity',
    category: 'Milk',
    badge: '99.9% Purity',
    volume: '500ml',
    price: 899,
    description:
      'Chilled glass-bottled donkey milk, gently collected and packed the same day for a clean, light taste close to nature.',
    longDescription:
      'Our fresh donkey milk is collected with care at SBM Donkey Farm and bottled the same day in sealed glass. Light, clean, and naturally gentle — ideal for daily wellness routines. Keep refrigerated and finish within the cold-chain window for best taste.',
    image: '/products/fresh-donkey-milk.png',
    gallery: ['/products/fresh-donkey-milk.png'],
    features: ['Farm fresh', 'Glass bottled', 'No additives'],
    inStock: true,
  },
  {
    id: 'donkey-milk-powder',
    number: '02',
    name: 'Donkey Milk Powder',
    tagline: "Nature's original superfood",
    category: 'Powder',
    badge: 'Nutrient Preserved',
    volume: '100g',
    price: 1499,
    description:
      'Slow-dried donkey milk powder that keeps nutrition intact — pure, gentle, and ready for everyday wellness.',
    longDescription:
      'Slow-dried into a fine powder so nutrients stay intact longer. Scoop into warm water, smoothies, or recipes. Packaged in a resealable pouch with no preservatives, no chemicals, and no additives.',
    image: '/products/donkey-milk-powder.png',
    gallery: ['/products/donkey-milk-powder.png'],
    features: ['No preservatives', 'No chemicals', 'Resealable pouch'],
    inStock: true,
  },
  {
    id: 'donkey-urine',
    number: '03',
    name: 'Collected Donkey Urine',
    tagline: 'Traditional farm collection',
    category: 'Urine',
    badge: '99.9% Collection Purity',
    volume: '500ml',
    price: 649,
    description:
      'Carefully collected donkey urine in sealed glass bottles, prepared for traditional and agricultural use cases.',
    longDescription:
      'Collected under farm hygiene protocols and sealed in glass for traditional and agricultural applications. Each batch is traceable from collection to pack. Store cool and upright.',
    image: '/products/donkey-urine.png',
    gallery: ['/products/donkey-urine.png'],
    features: ['Sealed glass', 'Traceable batch', 'Farm collected'],
    inStock: true,
  },
  {
    id: 'zero-degree-fruits',
    number: '04',
    name: '0° Cold Fruits',
    tagline: 'Harvest held at zero degrees',
    category: 'Fruits',
    badge: '0° Cold Chain',
    volume: '1kg pack',
    price: 499,
    description:
      'Seasonal farm fruits held at zero degrees from harvest to door — crisp texture, locked-in flavour, no artificial ripening.',
    longDescription:
      'Seasonal fruits moved through a zero-degree cold chain so flavour and texture stay locked in. No artificial ripening. Pack contents vary with harvest — mango, guava, citrus, pomegranate and more when in season.',
    image: '/products/zero-degree-fruits.jpg',
    gallery: ['/products/zero-degree-fruits.jpg'],
    features: ['0° storage', 'Seasonal pick', 'No artificial ripening'],
    inStock: true,
  },
  {
    id: 'organic-soil',
    number: '05',
    name: 'Organic Soil Input',
    tagline: 'Living soil from the farm',
    category: 'Soil',
    badge: 'Organic Soil Input',
    volume: '5kg sack',
    price: 349,
    description:
      'Rich organic soil input from SBM Donkey Farm — a natural boost for gardens, pots, and small farm beds.',
    longDescription:
      'A living organic soil input sourced from the farm cycle. Use in pots, kitchen gardens, and small beds to enrich structure and feed plants naturally. Keep dry until use.',
    image: '/products/organic-soil.png',
    gallery: ['/products/organic-soil.png'],
    features: ['Organic rich', 'Garden ready', 'Farm sourced'],
    inStock: true,
  },
]

export function getProduct(id: string) {
  return products.find((product) => product.id === id)
}

export function formatPrice(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`
}

export const SHIPPING_FEE = 79
export const FREE_SHIPPING_FROM = 1999
