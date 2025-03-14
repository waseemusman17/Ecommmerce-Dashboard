"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"

// Define the category type
interface Category {
  id: string
  name: string
  parentId?: string | null
  level?: number
}

// Mock categories data (flattened with level information)
const categories: Category[] = [
  { id: "1", name: "Electronics", level: 0 },
  { id: "1-1", name: "Computers", parentId: "1", level: 1 },
  { id: "1-1-1", name: "Laptops", parentId: "1-1", level: 2 },
  { id: "1-1-2", name: "Desktops", parentId: "1-1", level: 2 },
  { id: "1-2", name: "Audio", parentId: "1", level: 1 },
  { id: "1-3", name: "Smartphones", parentId: "1", level: 1 },
  { id: "2", name: "Clothing", level: 0 },
  { id: "2-1", name: "Men's", parentId: "2", level: 1 },
  { id: "2-2", name: "Women's", parentId: "2", level: 1 },
  { id: "3", name: "Home & Kitchen", level: 0 },
]

export default function NewProductPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [availableSubcategories, setAvailableSubcategories] = useState<Category[]>([])
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("")
  const [availableSubSubcategories, setAvailableSubSubcategories] = useState<Category[]>([])
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState<string>("")

  // Get top-level categories
  const topLevelCategories = categories.filter((cat) => !cat.parentId)

  // Update available subcategories when category changes
  useEffect(() => {
    if (selectedCategory) {
      const subcats = categories.filter((cat) => cat.parentId === selectedCategory)
      setAvailableSubcategories(subcats)
      setSelectedSubcategory("")
      setAvailableSubSubcategories([])
      setSelectedSubSubcategory("")
    } else {
      setAvailableSubcategories([])
      setSelectedSubcategory("")
      setAvailableSubSubcategories([])
      setSelectedSubSubcategory("")
    }
  }, [selectedCategory])

  // Update available sub-subcategories when subcategory changes
  useEffect(() => {
    if (selectedSubcategory) {
      const subSubcats = categories.filter((cat) => cat.parentId === selectedSubcategory)
      setAvailableSubSubcategories(subSubcats)
      setSelectedSubSubcategory("")
    } else {
      setAvailableSubSubcategories([])
      setSelectedSubSubcategory("")
    }
  }, [selectedSubcategory])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Get the most specific category selected
    const finalCategory = selectedSubSubcategory || selectedSubcategory || selectedCategory

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Product Created",
      description: "Your product has been created successfully.",
    })

    // Redirect to products page
    router.push("/dashboard/products")
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Add New Product</h1>
      </div>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="pricing">Pricing & Inventory</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Enter the basic information about your product.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="Enter product name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter product description" className="min-h-[150px]" />
              </div>

              {/* Category Selection */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="select_category">Select a category</SelectItem>
                      {topLevelCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Subcategory Selection - Only show if a category is selected and subcategories exist */}
                {selectedCategory && availableSubcategories.length > 0 && (
                  <div className="space-y-2">
                    <Label htmlFor="subcategory">Subcategory</Label>
                    <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                      <SelectTrigger id="subcategory">
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="select_subcategory">Select a subcategory</SelectItem>
                        {availableSubcategories.map((subcategory) => (
                          <SelectItem key={subcategory.id} value={subcategory.id}>
                            {subcategory.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Sub-subcategory Selection - Only show if a subcategory is selected and sub-subcategories exist */}
                {selectedSubcategory && availableSubSubcategories.length > 0 && (
                  <div className="space-y-2">
                    <Label htmlFor="subsubcategory">Sub-subcategory</Label>
                    <Select value={selectedSubSubcategory} onValueChange={setSelectedSubSubcategory}>
                      <SelectTrigger id="subsubcategory">
                        <SelectValue placeholder="Select sub-subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="select_subsubcategory">Select a sub-subcategory</SelectItem>
                        {availableSubSubcategories.map((subSubcategory) => (
                          <SelectItem key={subSubcategory.id} value={subSubcategory.id}>
                            {subSubcategory.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" placeholder="Enter brand name" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="images">
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
              <CardDescription>Upload images for your product. You can add up to 5 images.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex h-[150px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-muted-foreground"
                    >
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                      <line x1="16" x2="22" y1="5" y2="5" />
                      <line x1="19" x2="19" y1="2" y2="8" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                    <span className="text-sm text-muted-foreground">Click to upload or drag and drop</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Inventory</CardTitle>
              <CardDescription>Set the pricing and inventory details for your product.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="compare-price">Compare at Price ($)</Label>
                  <Input id="compare-price" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Cost per item ($)</Label>
                  <Input id="cost" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax">Tax Class</Label>
                  <Select>
                    <SelectTrigger id="tax">
                      <SelectValue placeholder="Select tax class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="reduced">Reduced Rate</SelectItem>
                      <SelectItem value="zero">Zero Rate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                <Input id="sku" placeholder="Enter SKU" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="barcode">Barcode (ISBN, UPC, GTIN, etc.)</Label>
                <Input id="barcode" placeholder="Enter barcode" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" type="number" placeholder="0" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Shipping</CardTitle>
              <CardDescription>Configure shipping settings for your product.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input id="weight" type="number" placeholder="0.0" />
                </div>
                <div className="space-y-2">
                  <Label>Dimensions</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Input placeholder="Length" />
                    <Input placeholder="Width" />
                    <Input placeholder="Height" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="shipping-class">Shipping Class</Label>
                <Select>
                  <SelectTrigger id="shipping-class">
                    <SelectValue placeholder="Select shipping class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="express">Express</SelectItem>
                    <SelectItem value="free">Free Shipping</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => router.push("/dashboard/products")}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Product"}
        </Button>
      </div>
    </div>
  )
}

