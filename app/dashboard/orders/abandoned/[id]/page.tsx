"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Mail, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"

// Mock data for abandoned carts (same as in abandoned-carts-table.tsx)
const abandonedCarts = [
  {
    id: "AC-001",
    customer: {
      name: "Emily Davis",
      email: "emily.d@example.com",
      avatar: "/avatars/04.png",
    },
    items: [
      {
        id: "1",
        name: "Premium Headphones",
        price: 59.99,
        quantity: 1,
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "5",
        name: "Laptop Stand",
        price: 29.99,
        quantity: 1,
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "6",
        name: "Wireless Charger",
        price: 39.99,
        quantity: 1,
        image: "/placeholder.svg?height=50&width=50",
      },
    ],
    total: 129.99,
    lastActive: "2023-05-18T14:32:00",
    recoveryStatus: "Not Contacted",
  },
  {
    id: "AC-002",
    customer: {
      name: "Michael Wilson",
      email: "michael.w@example.com",
      avatar: "/avatars/05.png",
    },
    items: [
      {
        id: "2",
        name: "Wireless Keyboard",
        price: 59.99,
        quantity: 1,
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "3",
        name: "Ergonomic Mouse",
        price: 29.99,
        quantity: 1,
        image: "/placeholder.svg?height=50&width=50",
      },
    ],
    total: 89.99,
    lastActive: "2023-05-19T09:45:00",
    recoveryStatus: "Email Sent",
  },
  {
    id: "AC-003",
    customer: {
      name: "Sarah Brown",
      email: "sarah.b@example.com",
      avatar: "/avatars/01.png",
    },
    items: [
      {
        id: "4",
        name: "4K Monitor",
        price: 149.99,
        quantity: 1,
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "2",
        name: "Wireless Keyboard",
        price: 59.99,
        quantity: 1,
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "3",
        name: "Ergonomic Mouse",
        price: 29.99,
        quantity: 1,
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "7",
        name: "Bluetooth Speaker",
        price: 79.99,
        quantity: 1,
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "8",
        name: "USB-C Hub",
        price: 49.99,
        quantity: 1,
        image: "/placeholder.svg?height=50&width=50",
      },
    ],
    total: 249.99,
    lastActive: "2023-05-17T16:20:00",
    recoveryStatus: "Recovered",
  },
  {
    id: "AC-004",
    customer: {
      name: "James Johnson",
      email: "james.j@example.com",
      avatar: "/avatars/02.png",
    },
    items: [
      {
        id: "1",
        name: "Premium Headphones",
        price: 59.99,
        quantity: 1,
        image: "/placeholder.svg?height=50&width=50",
      },
    ],
    total: 59.99,
    lastActive: "2023-05-20T11:15:00",
    recoveryStatus: "Not Contacted",
  },
  {
    id: "AC-005",
    customer: {
      name: "Lisa Taylor",
      email: "lisa.t@example.com",
      avatar: "/avatars/03.png",
    },
    items: [
      {
        id: "7",
        name: "Bluetooth Speaker",
        price: 79.99,
        quantity: 1,
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "6",
        name: "Wireless Charger",
        price: 39.99,
        quantity: 2,
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "8",
        name: "USB-C Hub",
        price: 49.99,
        quantity: 1,
        image: "/placeholder.svg?height=50&width=50",
      },
    ],
    total: 179.99,
    lastActive: "2023-05-16T13:40:00",
    recoveryStatus: "Email Sent",
  },
  {
    id: "AC-006",
    customer: {
      name: "Robert Martinez",
      email: "robert.m@example.com",
      avatar: "/avatars/04.png",
    },
    items: [
      {
        id: "2",
        name: "Wireless Keyboard",
        price: 59.99,
        quantity: 1,
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "3",
        name: "Ergonomic Mouse",
        price: 59.99,
        quantity: 1,
        image: "/placeholder.svg?height=50&width=50",
      },
    ],
    total: 119.99,
    lastActive: "2023-05-15T10:25:00",
    recoveryStatus: "Not Contacted",
  },
  {
    id: "AC-007",
    customer: {
      name: "Jennifer Adams",
      email: "jennifer.a@example.com",
      avatar: "/avatars/05.png",
    },
    items: [
      {
        id: "1",
        name: "Premium Headphones",
        price: 59.99,
        quantity: 1,
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "7",
        name: "Bluetooth Speaker",
        price: 79.99,
        quantity: 1,
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "8",
        name: "USB-C Hub",
        price: 49.99,
        quantity: 1,
        image: "/placeholder.svg?height=50&width=50",
      },
    ],
    total: 149.99,
    lastActive: "2023-05-14T15:50:00",
    recoveryStatus: "Lost",
  },
]

export default function AbandonedCartDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [cart, setCart] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the cart by ID
    const foundCart = abandonedCarts.find((c) => c.id === params.id)

    if (foundCart) {
      setCart(foundCart)
    }

    setLoading(false)
  }, [params.id])

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Calculate time elapsed since last activity
  const getTimeElapsed = (dateString: string) => {
    const lastActive = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} days ago`
    }
  }

  // Handle send recovery email
  const handleSendRecoveryEmail = () => {
    if (!cart) return

    toast({
      title: "Recovery Email Sent",
      description: `Recovery email has been sent to ${cart.customer.email}`,
    })
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/orders/abandoned">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to abandoned carts</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Loading...</h1>
        </div>
      </div>
    )
  }

  if (!cart) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/orders/abandoned">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to abandoned carts</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Cart Not Found</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Abandoned Cart Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The abandoned cart with ID "{params.id}" does not exist or has been removed.
              </p>
              <Button asChild>
                <Link href="/dashboard/orders/abandoned">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Abandoned Carts
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/orders/abandoned">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to abandoned carts</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Abandoned Cart Details</h1>
        </div>
        {cart.recoveryStatus !== "Recovered" && cart.recoveryStatus !== "Email Sent" && (
          <Button onClick={handleSendRecoveryEmail}>
            <Mail className="mr-2 h-4 w-4" />
            Send Recovery Email
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Details about the customer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={cart.customer.avatar} alt={cart.customer.name} />
                <AvatarFallback>
                  {cart.customer.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-lg">{cart.customer.name}</div>
                <div className="text-sm text-muted-foreground">{cart.customer.email}</div>
              </div>
            </div>
            <Separator />
            <div>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/dashboard/customers/${cart.customer.email}`}>
                  <User className="mr-2 h-4 w-4" />
                  View Customer Profile
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Cart Information</CardTitle>
            <CardDescription>Details about the abandoned cart</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Cart ID</h3>
                <p>{cart.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <Badge
                  variant={
                    cart.recoveryStatus === "Recovered"
                      ? "success"
                      : cart.recoveryStatus === "Email Sent"
                        ? "default"
                        : cart.recoveryStatus === "Lost"
                          ? "destructive"
                          : "secondary"
                  }
                >
                  {cart.recoveryStatus}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Last Active</h3>
                <p>{formatDate(cart.lastActive)}</p>
                <p className="text-xs text-muted-foreground">{getTimeElapsed(cart.lastActive)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Value</h3>
                <p className="text-lg font-bold">${cart.total.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Cart Items</CardTitle>
            <CardDescription>Products in the abandoned cart</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cart.items.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-md">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recovery Actions</CardTitle>
          <CardDescription>Actions to recover this abandoned cart</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium mb-2">Email Recovery</h3>
              <Button
                className="w-full"
                disabled={cart.recoveryStatus === "Recovered" || cart.recoveryStatus === "Email Sent"}
                onClick={handleSendRecoveryEmail}
              >
                <Mail className="mr-2 h-4 w-4" />
                Send Recovery Email
              </Button>
              {cart.recoveryStatus === "Email Sent" && (
                <p className="text-xs text-muted-foreground mt-2">
                  A recovery email has already been sent to this customer.
                </p>
              )}
              {cart.recoveryStatus === "Recovered" && (
                <p className="text-xs text-muted-foreground mt-2">
                  This cart has been recovered. No further action needed.
                </p>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Manual Actions</h3>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/dashboard/customers/${cart.customer.email}`}>
                  <User className="mr-2 h-4 w-4" />
                  Contact Customer
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

