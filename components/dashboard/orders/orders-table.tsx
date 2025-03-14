"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, MoreHorizontal, FileText } from "lucide-react"
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

// Mock data for orders
const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john.doe@example.com",
    date: "2023-05-15",
    total: 249.99,
    status: "Delivered",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane.smith@example.com",
    date: "2023-05-16",
    total: 129.99,
    status: "Processing",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-003",
    customer: "Robert Johnson",
    email: "robert.j@example.com",
    date: "2023-05-17",
    total: 349.99,
    status: "Shipped",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    email: "emily.d@example.com",
    date: "2023-05-18",
    total: 79.99,
    status: "Processing",
    paymentStatus: "Pending",
  },
  {
    id: "ORD-005",
    customer: "Michael Wilson",
    email: "michael.w@example.com",
    date: "2023-05-19",
    total: 199.99,
    status: "Delivered",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-006",
    customer: "Sarah Brown",
    email: "sarah.b@example.com",
    date: "2023-05-20",
    total: 149.99,
    status: "Cancelled",
    paymentStatus: "Refunded",
  },
  {
    id: "ORD-007",
    customer: "David Miller",
    email: "david.m@example.com",
    date: "2023-05-21",
    total: 299.99,
    status: "Shipped",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-008",
    customer: "Lisa Taylor",
    email: "lisa.t@example.com",
    date: "2023-05-22",
    total: 89.99,
    status: "Processing",
    paymentStatus: "Paid",
  },
]

export function OrdersTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")

  // Filter orders based on search term and filters
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter
    return matchesSearch && matchesStatus && matchesPayment
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:max-w-xs"
        />
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Order Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Payment Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="rounded-md border hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div>
                    <div>{order.customer}</div>
                    <div className="text-sm text-muted-foreground">{order.email}</div>
                  </div>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "Delivered"
                        ? "success"
                        : order.status === "Shipped"
                          ? "default"
                          : order.status === "Processing"
                            ? "warning"
                            : "destructive"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.paymentStatus === "Paid"
                        ? "outline"
                        : order.paymentStatus === "Pending"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {order.paymentStatus}
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
                        <Link href={`/dashboard/orders/${order.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Generate invoice
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Update status</DropdownMenuItem>
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
        {filteredOrders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{order.id}</CardTitle>
                <Badge
                  variant={
                    order.status === "Delivered"
                      ? "success"
                      : order.status === "Shipped"
                        ? "default"
                        : order.status === "Processing"
                          ? "warning"
                          : "destructive"
                  }
                >
                  {order.status}
                </Badge>
              </div>
              <div className="text-sm mt-1">
                <div className="font-medium">{order.customer}</div>
                <div className="text-muted-foreground">{order.email}</div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <span className="ml-2 font-medium">{order.date}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Total:</span>
                  <span className="ml-2 font-medium">${order.total.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Payment:</span>
                  <span className="ml-2">
                    <Badge
                      variant={
                        order.paymentStatus === "Paid"
                          ? "outline"
                          : order.paymentStatus === "Pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {order.paymentStatus}
                    </Badge>
                  </span>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/orders/${order.id}`}>
                    <Eye className="mr-1 h-3 w-3" />
                    View
                  </Link>
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="mr-1 h-3 w-3" />
                  Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

