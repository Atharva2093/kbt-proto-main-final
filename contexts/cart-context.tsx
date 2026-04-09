'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { CartItem } from '@/types/auth'

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (material: string) => void
  updateQuantity: (material: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.material === item.material)
      if (existingItem) {
        return prevItems.map((i) =>
          i.material === item.material ? { ...i, quantity: item.quantity } : i
        )
      }
      return [...prevItems, item]
    })
  }

  const removeItem = (material: string) => {
    setItems((prevItems) => prevItems.filter((i) => i.material !== material))
  }

  const updateQuantity = (material: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((i) =>
        i.material === material ? { ...i, quantity } : i
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.quantity * item.unitPrice, 0)
  }

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
