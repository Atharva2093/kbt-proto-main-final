"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  Download,
  Share2,
  Truck,
  Package,
  Clock,
  MapPin,
  Mail,
  Home,
  FileText,
} from "lucide-react"

// Mock order data - In real app, would come from state/context
const mockOrder = {
  orderId: "ORD-2024-00' + Math.random().toString().slice(2, 8)",
  total: 6510.5,
  subtotal: 6320,
  tax: 506,
  shipping: 150,
  estimatedDelivery: "5-7 business days",
  orderDate: new Date().toLocaleDateString(),
  items: [
    { material: "Aerogel Insulation Panel", quantity: 45, price: 82.5 },
    { material: "High-Density Mineral Wool", quantity: 45, price: 30.0 },
    { material: "Vapor Barrier Membrane", quantity: 50, price: 4.25 },
    { material: "Fiber Cement Board", quantity: 45, price: 17.5 },
    { material: "Fasteners & Adhesives Kit", quantity: 2, price: 115.0 },
    { material: "Sealant & Tape Bundle", quantity: 3, price: 42.0 },
  ],
  shippingAddress: {
    name: "John Doe",
    address: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
  },
  billingAddress: {
    name: "John Doe",
    address: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
  },
}

export default function OrderConfirmationPage() {
  const router = useRouter()

  return (
    <div className="space-y-6 pb-6 max-w-4xl mx-auto">
      {/* Success Banner */}
      <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-emerald-100 p-4">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-emerald-900 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-emerald-700 mb-6 max-w-md mx-auto">
          Thank you for your order. We've received it and will begin processing right away.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download Invoice PDF
          </Button>
          <Button variant="outline" className="gap-2">
            <Mail className="h-4 w-4" />
            Send to Email
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share Order
          </Button>
        </div>
      </div>

      {/* Order Details */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Header Info */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Order Number</p>
                  <p className="text-lg font-semibold text-foreground font-mono">
                    {mockOrder.orderId}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Order Date</p>
                  <p className="text-lg font-semibold text-foreground">
                    {mockOrder.orderDate}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <Badge className="bg-blue-400/20 text-blue-400 border-blue-400/30">
                    <Package className="h-3 w-3 mr-1.5" />
                    Processing
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Estimated Delivery</p>
                  <p className="text-lg font-semibold text-foreground">
                    {mockOrder.estimatedDelivery}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Items Ordered */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Items Ordered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockOrder.items.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-foreground">{item.material}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-semibold text-foreground">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                    {idx < mockOrder.items.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-lg p-4 border border-border">
                <p className="font-semibold text-foreground mb-1">
                  {mockOrder.shippingAddress.name}
                </p>
                <p className="text-sm text-muted-foreground mb-1">
                  {mockOrder.shippingAddress.address}
                </p>
                <p className="text-sm text-muted-foreground">
                  {mockOrder.shippingAddress.city}, {mockOrder.shippingAddress.state}{" "}
                  {mockOrder.shippingAddress.zip}
                </p>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20 flex items-start gap-2">
                <Clock className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-foreground mb-0.5">
                    Tracking Number
                  </p>
                  <p className="text-sm text-muted-foreground font-mono">
                    Coming soon via email
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing Address */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-primary" />
                Billing Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-lg p-4 border border-border">
                <p className="font-semibold text-foreground mb-1">
                  {mockOrder.billingAddress.name}
                </p>
                <p className="text-sm text-muted-foreground mb-1">
                  {mockOrder.billingAddress.address}
                </p>
                <p className="text-sm text-muted-foreground">
                  {mockOrder.billingAddress.city}, {mockOrder.billingAddress.state}{" "}
                  {mockOrder.billingAddress.zip}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-6">
          {/* Payment Summary */}
          <Card className="border-border bg-card sticky top-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${mockOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">${mockOrder.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span className="text-foreground">${mockOrder.tax.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">
                  ${mockOrder.total.toFixed(2)}
                </span>
              </div>

              <div className="mt-4 rounded-lg bg-emerald-50 border border-emerald-200 p-3">
                <p className="text-xs font-medium text-emerald-900 mb-1">
                  ✓ Payment Received
                </p>
                <p className="text-xs text-emerald-700">
                  Your payment has been processed securely
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2.5 text-sm">
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary font-semibold text-xs flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Confirmation Email</p>
                    <p className="text-xs text-muted-foreground">
                      Check your inbox for confirmation
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary font-semibold text-xs flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Shipment Prepared</p>
                    <p className="text-xs text-muted-foreground">
                      1-2 days to pack & prepare
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary font-semibold text-xs flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Tracking Number</p>
                    <p className="text-xs text-muted-foreground">
                      Sent via email with shipping label
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary font-semibold text-xs flex-shrink-0">
                    4
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Delivery</p>
                    <p className="text-xs text-muted-foreground">
                      Expected in {mockOrder.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/dashboard">
          <Button variant="outline" size="lg">
            Return to Dashboard
          </Button>
        </Link>
        <Link href="/dashboard/thermal-analysis">
          <Button size="lg">Create New Project</Button>
        </Link>
      </div>
    </div>
  )
}
