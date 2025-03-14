"use client"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Edit, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

// Mock data for products (same as in products-table.tsx)
const products = [
  {
    id: "1",
    name: "Premium Headphones",
    category: "Electronics",
    price: 199.99,
    stock: 45,
    status: "In Stock",
    image: "/placeholder.svg?height=400&width=400",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
    sku: "HDPH-001",
    dimensions: "8 x 6 x 3 inches",
    weight: "0.55 lbs",
    features: [
      "Active Noise Cancellation",
      "40-hour battery life",
      "Bluetooth 5.0 connectivity",
      "Built-in microphone for calls",
      "Comfortable over-ear design",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 Ohms",
      Connectivity: "Bluetooth 5.0, 3.5mm jack",
      Battery: "500mAh rechargeable",
      Charging: "USB-C",
    },
  },
  {
    id: "2",
    name: "Wireless Keyboard",
    category: "Electronics",
    price: 59.99,
    stock: 32,
    status: "In Stock",
    image: "/placeholder.svg?height=400&width=400",
    description: "Ergonomic wireless keyboard with backlit keys and multi-device connectivity.",
    sku: "KBRD-002",
    dimensions: "17 x 5 x 1 inches",
    weight: "1.2 lbs",
    features: [
      "Backlit keys with adjustable brightness",
      "Connect up to 3 devices simultaneously",
      "Ergonomic design for comfortable typing",
      "Rechargeable battery with 3-month life",
      "Compatible with Windows, macOS, iOS, and Android",
    ],
    specifications: {
      "Key Type": "Membrane",
      Layout: "Full-size with numpad",
      Connectivity: "Bluetooth 5.0, 2.4GHz wireless",
      Battery: "1500mAh rechargeable",
      Charging: "USB-C",
    },
  },
  {
    id: "3",
    name: "Ergonomic Mouse",
    category: "Electronics",
    price: 39.99,
    stock: 18,
    status: "Low Stock",
    image: "/placeholder.svg?height=400&width=400",
    description: "Comfortable ergonomic mouse designed for all-day use with adjustable DPI settings.",
    sku: "MOUS-003",
    dimensions: "5 x 3 x 2 inches",
    weight: "0.25 lbs",
    features: [
      "Ergonomic vertical design reduces wrist strain",
      "Adjustable DPI settings (800/1200/1600/2400)",
      "Silent click technology",
      "6 programmable buttons",
      "Compatible with Windows and macOS",
    ],
    specifications: {
      Sensor: "Optical",
      "DPI Range": "800-2400",
      Buttons: "6 programmable",
      Connectivity: "2.4GHz wireless",
      Battery: "1 AA battery (included)",
    },
  },
  {
    id: "4",
    name: "4K Monitor",
    category: "Electronics",
    price: 349.99,
    stock: 0,
    status: "Out of Stock",
    image: "/placeholder.svg?height=400&width=400",
    description: "Ultra HD 4K monitor with wide color gamut and adjustable stand.",
    sku: "MNTR-004",
    dimensions: "24 x 18 x 8 inches",
    weight: "12.5 lbs",
    features: [
      "4K Ultra HD resolution (3840 x 2160)",
      "IPS panel with 99% sRGB color accuracy",
      "Height, tilt, and swivel adjustable stand",
      "Multiple connectivity options (HDMI, DisplayPort, USB-C)",
      "Built-in speakers",
    ],
    specifications: {
      "Screen Size": "27 inches",
      Resolution: "3840 x 2160 (4K UHD)",
      "Panel Type": "IPS",
      "Refresh Rate": "60Hz",
      "Response Time": "5ms",
      Ports: "2x HDMI 2.0, 1x DisplayPort 1.4, 1x USB-C",
    },
  },
  {
    id: "5",
    name: "Laptop Stand",
    category: "Accessories",
    price: 29.99,
    stock: 65,
    status: "In Stock",
    image: "/placeholder.svg?height=400&width=400",
    description: "Adjustable aluminum laptop stand for improved ergonomics and cooling.",
    sku: "STND-005",
    dimensions: "10 x 8 x 2 inches",
    weight: "1.8 lbs",
    features: [
      "Adjustable height and angle",
      "Aluminum construction for heat dissipation",
      "Foldable design for portability",
      "Non-slip silicone pads",
      "Compatible with laptops 11-17 inches",
    ],
    specifications: {
      Material: "Aluminum alloy",
      "Compatible Sizes": "11-17 inch laptops",
      "Height Adjustment": "6 levels",
      "Angle Adjustment": "0-45 degrees",
      Foldable: "Yes",
    },
  },
  {
    id: "6",
    name: "Wireless Charger",
    category: "Accessories",
    price: 24.99,
    stock: 41,
    status: "In Stock",
    image: "/placeholder.svg?height=400&width=400",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    sku: "CHRG-006",
    dimensions: "4 x 4 x 0.5 inches",
    weight: "0.2 lbs",
    features: [
      "15W fast wireless charging",
      "Compatible with all Qi-enabled devices",
      "Slim and compact design",
      "LED charging indicator",
      "Overcharge protection",
    ],
    specifications: {
      "Charging Speed": "15W max",
      Input: "QC 3.0 / PD adapter",
      Compatibility: "Qi-enabled devices",
      "Cable Length": "3.3ft (1m)",
      "Safety Features": "Overcharge, over-voltage, temperature protection",
    },
  },
  {
    id: "7",
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 79.99,
    stock: 23,
    status: "In Stock",
    image: "/placeholder.svg?height=400&width=400",
    description: "Portable Bluetooth speaker with 360° sound and 12-hour battery life.",
    sku: "SPKR-007",
    dimensions: "6 x 6 x 7 inches",
    weight: "1.5 lbs",
    features: [
      "360° immersive sound",
      "IPX7 waterproof rating",
      "12-hour battery life",
      "Built-in microphone for calls",
      "Bluetooth 5.0 connectivity",
    ],
    specifications: {
      "Speaker Output": "20W",
      Battery: "3600mAh rechargeable",
      "Waterproof Rating": "IPX7",
      Connectivity: "Bluetooth 5.0",
      Charging: "USB-C",
      Microphone: "Built-in for calls",
    },
  },
  {
    id: "8",
    name: "USB-C Hub",
    category: "Accessories",
    price: 49.99,
    stock: 12,
    status: "Low Stock",
    image: "/placeholder.svg?height=400&width=400",
    description: "7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery.",
    sku: "USBC-008",
    dimensions: "4 x 2 x 0.5 inches",
    weight: "0.15 lbs",
    features: [
      "7-in-1 connectivity solution",
      "4K HDMI output",
      "100W Power Delivery pass-through",
      "SD and microSD card readers",
      "3x USB 3.0 ports",
    ],
    specifications: {
      Ports: "HDMI, 3x USB 3.0, SD, microSD, USB-C PD",
      "HDMI Output": "4K@30Hz",
      "Power Delivery": "100W pass-through",
      "Data Transfer": "Up to 5Gbps",
      Compatibility: "USB-C laptops and tablets",
    },
  },
]

export default function ProductPreviewPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === params.id)
    if (foundProduct) {
      setProduct(foundProduct)
    } else {
      // If product not found, redirect to products page after a small delay
      const timer = setTimeout(() => {
        router.push("/dashboard/products")
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [params.id, router])

  if (!product) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p>Loading product...</p>
          <Button variant="outline" asChild>
            <Link href="/dashboard/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Products
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between bg-background sticky top-0 z-10 py-4 border-b">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/dashboard/products/${product.id}`}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to product</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Product Preview</h1>
            <p className="text-sm text-muted-foreground">This is how the product appears to customers</p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/dashboard/products/${product.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Product
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex justify-center items-center bg-white rounded-lg p-6">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={400}
            className="object-contain max-h-[400px]"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              {product.status === "In Stock" ? (
                <Badge variant="default" className="ml-2">
                  {product.status}
                </Badge>
              ) : product.status === "Low Stock" ? (
                <Badge variant="warning" className="ml-2">
                  {product.status} - Only {product.stock} left
                </Badge>
              ) : (
                <Badge variant="destructive" className="ml-2">
                  {product.status}
                </Badge>
              )}
            </div>
          </div>

          <p className="text-gray-700">{product.description}</p>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-r-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={product.status === "Out of Stock"}
                >
                  -
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                  className="h-8 w-16 rounded-none text-center"
                  disabled={product.status === "Out of Stock"}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-l-none"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={product.status === "Out of Stock" || quantity >= product.stock}
                >
                  +
                </Button>
              </div>
            </div>
            <Button className="w-full" onClick={handleAddToCart} disabled={product.status === "Out of Stock"}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.status === "Out of Stock" ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">SKU:</span>
              <span>{product.sku}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Category:</span>
              <span>{product.category}</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="features" className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
        </TabsList>
        <TabsContent value="features" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <ul className="list-disc pl-5 space-y-2">
                {product.features.map((feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="specifications" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]: [string, any]) => (
                  <div key={key} className="flex justify-between border-b pb-2">
                    <span className="font-medium">{key}:</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="shipping" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Dimensions</h3>
                  <p>{product.dimensions}</p>
                </div>
                <div>
                  <h3 className="font-medium">Weight</h3>
                  <p>{product.weight}</p>
                </div>
                <div>
                  <h3 className="font-medium">Shipping Information</h3>
                  <p>Free shipping on orders over $50. Standard delivery takes 3-5 business days.</p>
                </div>
                <div>
                  <h3 className="font-medium">Returns</h3>
                  <p>30-day money-back guarantee. Return shipping is free for defective items.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

