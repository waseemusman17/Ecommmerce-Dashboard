"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Edit, MoreHorizontal, Trash, Eye, ExternalLink } from "lucide-react"
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

// Mock data for products
const products = [
  {
    id: "1",
    name: "Premium Headphones",
    category: "Electronics",
    price: 199.99,
    stock: 45,
    status: "In Stock",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "2",
    name: "Wireless Keyboard",
    category: "Electronics",
    price: 59.99,
    stock: 32,
    status: "In Stock",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "3",
    name: "Ergonomic Mouse",
    category: "Electronics",
    price: 39.99,
    stock: 18,
    status: "Low Stock",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "4",
    name: "4K Monitor",
    category: "Electronics",
    price: 349.99,
    stock: 0,
    status: "Out of Stock",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "5",
    name: "Laptop Stand",
    category: "Accessories",
    price: 29.99,
    stock: 65,
    status: "In Stock",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "6",
    name: "Wireless Charger",
    category: "Accessories",
    price: 24.99,
    stock: 41,
    status: "In Stock",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "7",
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 79.99,
    stock: 23,
    status: "In Stock",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "8",
    name: "USB-C Hub",
    category: "Accessories",
    price: 49.99,
    stock: 12,
    status: "Low Stock",
    image: "/placeholder.svg?height=50&width=50",
  },
]

export function ProductsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter products based on search term and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:max-w-xs"
        />
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="In Stock">In Stock</SelectItem>
              <SelectItem value="Low Stock">Low Stock</SelectItem>
              <SelectItem value="Out of Stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="rounded-md border hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      product.status === "In Stock"
                        ? "default"
                        : product.status === "Low Stock"
                          ? "warning"
                          : "destructive"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 focus:ring-0 focus-visible:ring-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px] z-50">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/products/${product.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/products/${product.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Product
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/products/${product.id}/preview`}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Preview
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
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
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader className="p-4">
              <div className="flex items-center gap-4">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <CardTitle className="text-base">{product.name}</CardTitle>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-muted-foreground">{product.category}</span>
                    <Badge
                      variant={
                        product.status === "In Stock"
                          ? "default"
                          : product.status === "Low Stock"
                            ? "warning"
                            : "destructive"
                      }
                    >
                      {product.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Price:</span>
                  <span className="ml-2 font-medium">${product.price.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Stock:</span>
                  <span className="ml-2 font-medium">{product.stock}</span>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-3 w-3 mr-1" />
                      Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px] z-50">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/products/${product.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/products/${product.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Product
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/products/${product.id}/preview`}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Preview
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

