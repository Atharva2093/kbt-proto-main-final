"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ShoppingCart, ArrowLeft, CreditCard, Truck, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

const STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
  "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming"
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCart()
  const [isSameAddress, setIsSameAddress] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    // Shipping
    shippingFirstName: "",
    shippingLastName: "",
    shippingEmail: "",
    shippingPhone: "",
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    // Billing
    billingFirstName: "",
    billingLastName: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    // Payment
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate cart has items
    if (!items || items.length === 0) {
      setError("Your cart is empty. Please add items before checkout.")
      return
    }

    // Validate required shipping fields
    if (
      !formData.shippingFirstName ||
      !formData.shippingLastName ||
      !formData.shippingEmail ||
      !formData.shippingPhone ||
      !formData.shippingAddress ||
      !formData.shippingCity ||
      !formData.shippingState ||
      !formData.shippingZip
    ) {
      setError("Please fill in all shipping address fields.")
      return
    }

    // Validate billing address if not same as shipping
    if (!isSameAddress) {
      if (
        !formData.billingFirstName ||
        !formData.billingLastName ||
        !formData.billingAddress ||
        !formData.billingCity ||
        !formData.billingState ||
        !formData.billingZip
      ) {
        setError("Please fill in all billing address fields.")
        return
      }
    }

    // Validate payment fields
    if (
      !formData.cardName ||
      !formData.cardNumber ||
      !formData.expiry ||
      !formData.cvv
    ) {
      setError("Please fill in all payment information fields.")
      return
    }

    // Validate card number length (basic validation)
    if (formData.cardNumber.replace(/\s/g, "").length !== 16) {
      setError("Please enter a valid 16-digit card number.")
      return
    }

    // Validate CVV length
    if (formData.cvv.length !== 3 && formData.cvv.length !== 4) {
      setError("Please enter a valid CVV (3 or 4 digits).")
      return
    }

    setIsProcessing(true)

    try {
      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear cart and redirect to confirmation
      clearCart()
      router.push("/dashboard/order-confirmation")
    } finally {
      setIsProcessing(false)
    }
  }

  const subtotal = getTotalPrice()
  const shipping = 150
  const tax = Math.round(subtotal * 0.08 * 100) / 100
  const total = subtotal + shipping + tax

  return (
    <div className="space-y-6 pb-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/procurement">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
          <p className="text-muted-foreground">Complete your procurement order</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            {error && (
              <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive border border-destructive/30">
                {error}
              </div>
            )}
            {/* Shipping Information */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="shippingFirstName">First Name</Label>
                    <Input
                      id="shippingFirstName"
                      name="shippingFirstName"
                      value={formData.shippingFirstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shippingLastName">Last Name</Label>
                    <Input
                      id="shippingLastName"
                      name="shippingLastName"
                      value={formData.shippingLastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shippingEmail">Email</Label>
                  <Input
                    id="shippingEmail"
                    name="shippingEmail"
                    type="email"
                    value={formData.shippingEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shippingPhone">Phone Number</Label>
                  <Input
                    id="shippingPhone"
                    name="shippingPhone"
                    type="tel"
                    value={formData.shippingPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shippingAddress">Street Address</Label>
                  <Input
                    id="shippingAddress"
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="shippingCity">City</Label>
                    <Input
                      id="shippingCity"
                      name="shippingCity"
                      value={formData.shippingCity}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shippingState">State</Label>
                    <select
                      id="shippingState"
                      name="shippingState"
                      value={formData.shippingState}
                      onChange={handleInputChange}
                      className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="">Select State</option>
                      {STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shippingZip">ZIP Code</Label>
                    <Input
                      id="shippingZip"
                      name="shippingZip"
                      value={formData.shippingZip}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing Information */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="sameAddress"
                    checked={isSameAddress}
                    onCheckedChange={(checked) => setIsSameAddress(checked as boolean)}
                  />
                  <Label htmlFor="sameAddress" className="cursor-pointer">
                    Same as shipping address
                  </Label>
                </div>

                {!isSameAddress && (
                  <div className="space-y-4 pt-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="billingFirstName">First Name</Label>
                        <Input
                          id="billingFirstName"
                          name="billingFirstName"
                          value={formData.billingFirstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingLastName">Last Name</Label>
                        <Input
                          id="billingLastName"
                          name="billingLastName"
                          value={formData.billingLastName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="billingAddress">Street Address</Label>
                      <Input
                        id="billingAddress"
                        name="billingAddress"
                        value={formData.billingAddress}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="billingCity">City</Label>
                        <Input
                          id="billingCity"
                          name="billingCity"
                          value={formData.billingCity}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingState">State</Label>
                        <select
                          id="billingState"
                          name="billingState"
                          value={formData.billingState}
                          onChange={handleInputChange}
                          className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Select State</option>
                          {STATES.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingZip">ZIP Code</Label>
                        <Input
                          id="billingZip"
                          name="billingZip"
                          value={formData.billingZip}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      name="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-primary/5 p-3 border border-primary/20">
                  <Lock className="h-4 w-4 text-primary flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    Your payment information is secure and encrypted
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Place Order Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full gap-2"
              disabled={isProcessing || items.length === 0}
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </Button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <Card className="border-border bg-card sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.material} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium text-foreground">{item.material}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.quantity} × ${item.unitPrice.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-semibold text-foreground">
                      ${(item.quantity * item.unitPrice).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Pricing Breakdown */}
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span className="text-foreground">${tax.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
              </div>

              {/* Delivery Estimate */}
              <div className="mt-4 rounded-lg bg-primary/5 p-3 border border-primary/20">
                <p className="text-xs font-medium text-foreground mb-1">Estimated Delivery</p>
                <p className="text-sm text-muted-foreground">
                  5-7 business days within the continental US
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
