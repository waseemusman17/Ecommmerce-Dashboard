"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, MoreHorizontal, Mail } from "lucide-react"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for customers
const customers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    orders: 12,
    spent: 1249.99,
    status: "Active",
    lastOrder: "2023-05-15",
    avatar: "/avatars/01.png",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    orders: 8,
    spent: 829.99,
    status: "Active",
    lastOrder: "2023-05-10",
    avatar: "/avatars/02.png",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.j@example.com",
    orders: 5,
    spent: 549.99,
    status: "Active",
    lastOrder: "2023-04-28",
    avatar: "/avatars/03.png",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@example.com",
    orders: 3,
    spent: 279.99,
    status: "Inactive",
    lastOrder: "2023-03-15",
    avatar: "/avatars/04.png",
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael.w@example.com",
    orders: 15,
    spent: 1899.99,
    status: "Active",
    lastOrder: "2023-05-18",
    avatar: "/avatars/05.png",
  },
  {
    id: "6",
    name: "Sarah Brown",
    email: "sarah.b@example.com",
    orders: 7,
    spent: 749.99,
    status: "Active",
    lastOrder: "2023-05-05",
    avatar: "/avatars/01.png",
  },
  {
    id: "7",
    name: "David Miller",
    email: "david.m@example.com",
    orders: 0,
    spent: 0,
    status: "Inactive",
    lastOrder: "N/A",
    avatar: "/avatars/02.png",
  },
  {
    id: "8",
    name: "Lisa Taylor",
    email: "lisa.t@example.com",
    orders: 9,
    spent: 989.99,
    status: "Active",
    lastOrder: "2023-05-12",
    avatar: "/avatars/03.png",
  },
]

export function CustomersTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter customers based on search term and status filter
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:max-w-xs"
        />
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full sm:w-auto"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="rounded-md border hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={customer.avatar} alt={customer.name} />
                      <AvatarFallback>
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">{customer.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell>${customer.spent.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={customer.status === "Active" ? "default" : "secondary"}>{customer.status}</Badge>
                </TableCell>
                <TableCell>{customer.lastOrder}</TableCell>
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
                        <Link href={`/dashboard/customers/${customer.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Send email
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Edit customer</DropdownMenuItem>
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
        {filteredCustomers.map((customer) => (
          <Card key={customer.id}>
            <CardHeader className="p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={customer.avatar} alt={customer.name} />
                  <AvatarFallback>
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-base">{customer.name}</CardTitle>
                  <div className="text-sm text-muted-foreground">{customer.email}</div>
                </div>
                <Badge variant={customer.status === "Active" ? "default" : "secondary"}>{customer.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Orders:</span>
                  <span className="ml-2 font-medium">{customer.orders}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Spent:</span>
                  <span className="ml-2 font-medium">${customer.spent.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Order:</span>
                  <span className="ml-2 font-medium">{customer.lastOrder}</span>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/customers/${customer.id}`}>
                    <Eye className="mr-1 h-3 w-3" />
                    View
                  </Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="mr-1 h-3 w-3" />
                  Email
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

