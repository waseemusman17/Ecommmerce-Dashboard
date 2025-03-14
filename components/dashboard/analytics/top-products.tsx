import { Progress } from "@/components/ui/progress"

const topProducts = [
  {
    name: "Premium Headphones",
    revenue: 12500,
    percentage: 100,
  },
  {
    name: "Wireless Keyboard",
    revenue: 9800,
    percentage: 78,
  },
  {
    name: "4K Monitor",
    revenue: 8200,
    percentage: 66,
  },
  {
    name: "Bluetooth Speaker",
    revenue: 6500,
    percentage: 52,
  },
  {
    name: "Ergonomic Mouse",
    revenue: 5200,
    percentage: 42,
  },
]

export function TopProducts() {
  return (
    <div className="space-y-4">
      {topProducts.map((product) => (
        <div key={product.name} className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="text-sm text-muted-foreground">${product.revenue.toLocaleString()}</span>
          </div>
          <Progress value={product.percentage} className="h-2" />
        </div>
      ))}
    </div>
  )
}

