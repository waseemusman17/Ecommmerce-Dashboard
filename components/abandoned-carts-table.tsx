"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, MoreHorizontal, Mail, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/hooks/use-toast"

// Mock data for abandoned carts
const abandonedCarts = [
  {
    id: "AC-001",
    customer: {
      name: "Emily Davis",
      email: "emily.d@example.com",
      avatar: "/avatars/04.png",
    },
    items: 3,
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
    items: 2,
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
    items: 5,
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
    items: 1,
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
    items: 4,
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
    items: 2,
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
    items: 3,
    total: 149.99,
    lastActive: "2023-05-14T15:50:00",
    recoveryStatus: "Lost",
  },
]

export function AbandonedCartsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter carts based on search term and status filter
  const filteredCarts = abandonedCarts.filter((cart) => {
    const matchesSearch =
      cart.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cart.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cart.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || cart.recoveryStatus === statusFilter

    return matchesSearch && matchesStatus
  })

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
  const handleSendRecoveryEmail = (cartId: string, customerEmail: string) => {
    toast({
      title: "Recovery Email Sent",
      description: `Recovery email has been sent to ${customerEmail}`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          placeholder="Search abandoned carts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:max-w-xs"
        />
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Recovery Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Not Contacted">Not Contacted</SelectItem>
              <SelectItem value="Email Sent">Email Sent</SelectItem>
              <SelectItem value="Recovered">Recovered</SelectItem>
              <SelectItem value="Lost">Lost</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="rounded-md border hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Cart ID</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCarts.map((cart) => (
              <TableRow key={cart.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={cart.customer.avatar} alt={cart.customer.name} />
                      <AvatarFallback>
                        {cart.customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{cart.customer.name}</div>
                      <div className="text-sm text-muted-foreground">{cart.customer.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{cart.id}</TableCell>
                <TableCell>{cart.items}</TableCell>
                <TableCell>${cart.total.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{formatDate(cart.lastActive)}</span>
                    <span className="text-xs text-muted-foreground">{getTimeElapsed(cart.lastActive)}</span>
                  </div>
                </TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/orders/abandoned/${cart.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View cart details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleSendRecoveryEmail(cart.id, cart.customer.email)}
                        disabled={cart.recoveryStatus === "Recovered" || cart.recoveryStatus === "Email Sent"}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Send recovery email
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/customers/${cart.customer.email}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View customer
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredCarts.map((cart) => (
          <Card key={cart.id}>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={cart.customer.avatar} alt={cart.customer.name} />
                    <AvatarFallback>
                      {cart.customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{cart.customer.name}</CardTitle>
                    <div className="text-sm text-muted-foreground">{cart.customer.email}</div>
                  </div>
                </div>
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
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div>
                  <span className="text-muted-foreground">Cart ID:</span>
                  <span className="ml-2 font-medium">{cart.id}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Items:</span>
                  <span className="ml-2 font-medium">{cart.items}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Total:</span>
                  <span className="ml-2 font-medium">${cart.total.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Active:</span>
                  <span className="ml-2 font-medium">{getTimeElapsed(cart.lastActive)}</span>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/orders/abandoned/${cart.id}`}>
                    <ShoppingCart className="mr-1 h-3 w-3" />
                    View Cart
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendRecoveryEmail(cart.id, cart.customer.email)}
                  disabled={cart.recoveryStatus === "Recovered" || cart.recoveryStatus === "Email Sent"}
                >
                  <Mail className="mr-1 h-3 w-3" />
                  Send Email
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCarts.length === 0 && (
        <div className="rounded-md border p-8 text-center">
          <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            <ShoppingCart className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No abandoned carts found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter to find what you're looking for."
                : "When customers add items to their cart but don't complete checkout, they'll appear here."}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

