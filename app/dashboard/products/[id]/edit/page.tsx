"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

// Mock data for products (same as in products-table.tsx)
const products = [
  {
    id: "1",
    name: "Premium Headphones",
    category: "Electronics",
    price: 199.99,
    stock: 45,
    status: "In Stock",
    image: "/placeholder.svg?height=200&width=200",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
    sku: "HDPH-001",
    dimensions: "8 x 6 x 3 inches",
    weight: "0.55 lbs",
  },
  {
    id: "2",
    name: "Wireless Keyboard",
    category: "Electronics",
    price: 59.99,
    stock: 32,
    status: "In Stock",
    image: "/placeholder.svg?height=200&width=200",
    description: "Ergonomic wireless keyboard with backlit keys and multi-device connectivity.",
    sku: "KBRD-002",
    dimensions: "17 x 5 x 1 inches",
    weight: "1.2 lbs",
  },
  {
    id: "3",
    name: "Ergonomic Mouse",
    category: "Electronics",
    price: 39.99,
    stock: 18,
    status: "Low Stock",
    image: "/placeholder.svg?height=200&width=200",
    description: "Comfortable ergonomic mouse designed for all-day use with adjustable DPI settings.",
    sku: "MOUS-003",
    dimensions: "5 x 3 x 2 inches",
    weight: "0.25 lbs",
  },
  {
    id: "4",
    name: "4K Monitor",
    category: "Electronics",
    price: 349.99,
    stock: 0,
    status: "Out of Stock",
    image: "/placeholder.svg?height=200&width=200",
    description: "Ultra HD 4K monitor with wide color gamut and adjustable stand.",
    sku: "MNTR-004",
    dimensions: "24 x 18 x 8 inches",
    weight: "12.5 lbs",
  },
  {
    id: "5",
    name: "Laptop Stand",
    category: "Accessories",
    price: 29.99,
    stock: 65,
    status: "In Stock",
    image: "/placeholder.svg?height=200&width=200",
    description: "Adjustable aluminum laptop stand for improved ergonomics and cooling.",
    sku: "STND-005",
    dimensions: "10 x 8 x 2 inches",
    weight: "1.8 lbs",
  },
  {
    id: "6",
    name: "Wireless Charger",
    category: "Accessories",
    price: 24.99,
    stock: 41,
    status: "In Stock",
    image: "/placeholder.svg?height=200&width=200",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    sku: "CHRG-006",
    dimensions: "4 x 4 x 0.5 inches",
    weight: "0.2 lbs",
  },
  {
    id: "7",
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 79.99,
    stock: 23,
    status: "In Stock",
    image: "/placeholder.svg?height=200&width=200",
    description: "Portable Bluetooth speaker with 360° sound and 12-hour battery life.",
    sku: "SPKR-007",
    dimensions: "6 x 6 x 7 inches",
    weight: "1.5 lbs",
  },
  {
    id: "8",
    name: "USB-C Hub",
    category: "Accessories",
    price: 49.99,
    stock: 12,
    status: "Low Stock",
    image: "/placeholder.svg?height=200&width=200",
    description: "7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery.",
    sku: "USBC-008",
    dimensions: "4 x 2 x 0.5 inches",
    weight: "0.15 lbs",
  },
]

export default function ProductEditPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "",
    description: "",
    sku: "",
    dimensions: "",
    weight: "",
  })

  useEffect(() => {
    const product = products.find((p) => p.id === params.id)
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        stock: product.stock.toString(),
        status: product.status,
        description: product.description,
        sku: product.sku,
        dimensions: product.dimensions,
        weight: product.weight,
      })
    } else {
      router.push("/dashboard/products")
    }
  }, [params.id, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Product Updated",
        description: "Product has been updated successfully.",
      })

      router.push(`/dashboard/products/${params.id}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/dashboard/products/${params.id}`}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to product</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Edit Product</h1>
        </div>
        <Button type="submit" form="edit-product-form" disabled={isSubmitting}>
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <form id="edit-product-form" onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>Basic information about the product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Accessories">Accessories</SelectItem>
                    <SelectItem value="Clothing">Clothing</SelectItem>
                    <SelectItem value="Home & Kitchen">Home & Kitchen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing & Inventory</CardTitle>
              <CardDescription>Manage pricing and stock information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" name="sku" value={formData.sku} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In Stock">In Stock</SelectItem>
                    <SelectItem value="Low Stock">Low Stock</SelectItem>
                    <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Specifications</CardTitle>
              <CardDescription>Physical attributes of the product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dimensions">Dimensions</Label>
                <Input
                  id="dimensions"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  placeholder="e.g., 10 x 5 x 2 inches"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g., 1.5 lbs"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Image</CardTitle>
              <CardDescription>Manage product images</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center p-4 border-2 border-dashed rounded-md">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Product image"
                  width={200}
                  height={200}
                  className="rounded-md object-contain"
                />
              </div>
              <div className="flex justify-center">
                <Button variant="outline" type="button">
                  Upload New Image
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardFooter className="flex justify-between p-6">
            <Button variant="outline" asChild>
              <Link href={`/dashboard/products/${params.id}`}>Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

