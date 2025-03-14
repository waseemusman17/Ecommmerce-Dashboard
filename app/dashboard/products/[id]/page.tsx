import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Edit, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/products">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to products</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">{product.name}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/products/${product.id}/preview`}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Preview
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/products/${product.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Product
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-6 flex justify-center">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={300}
              className="rounded-md object-contain"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
            <CardDescription>Details about this product</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                <p>{product.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                <p>{product.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Price</h3>
                <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
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
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">SKU</h3>
                <p>{product.sku}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Stock</h3>
                <p>{product.stock} units</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Dimensions</h3>
                <p>{product.dimensions}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Weight</h3>
                <p>{product.weight}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
              <p className="mt-1">{product.description}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

