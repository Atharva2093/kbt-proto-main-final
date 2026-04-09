export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  company: string
  avatar?: string
  createdAt: Date
}

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, firstName: string, lastName: string, company: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

export interface Project {
  id: string
  userId: string
  name: string
  type: "residential" | "commercial" | "industrial" | "educational"
  climateZone: string
  wallArea: number
  status: "In Progress" | "Completed" | "Pending Review"
  updated: Date
  uValue: number
  heatLoss: string
  efficiency: string
}

export interface CartItem {
  material: string
  supplier: string
  quantity: number
  unitPrice: number
  availability: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  totalPrice: number
  status: "pending" | "confirmed" | "shipped" | "delivered"
  shippingAddress: ShippingAddress
  billingAddress: BillingAddress
  estimatedDelivery: Date
  createdAt: Date
}

export interface ShippingAddress {
  fullName: string
  streetAddress: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
}

export interface BillingAddress extends ShippingAddress {
  sameAsShipping?: boolean
}
