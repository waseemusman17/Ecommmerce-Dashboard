import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const discounts = [
  {
    code: "SUMMER20",
    discount: "20% Off",
    uses: 345,
    revenue: 12680,
    status: "Active",
  },
  {
    code: "WELCOME10",
    discount: "10% Off",
    uses: 289,
    revenue: 8790,
    status: "Active",
  },
  {
    code: "FLASH50",
    discount: "50% Off",
    uses: 156,
    revenue: 3420,
    status: "Expired",
  },
]

export function DiscountPerformance() {
  return (
    <div className="space-y-4">
      {discounts.map((discount) => (
        <div key={discount.code} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7 rounded-sm bg-primary/10 text-primary">
                <AvatarFallback>{discount.code.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{discount.code}</span>
              <Badge variant={discount.status === "Active" ? "outline" : "secondary"} className="ml-2">
                {discount.status}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">{discount.discount}</div>
          </div>
          <div className="text-right">
            <div className="font-medium">{discount.uses} uses</div>
            <div className="text-sm text-muted-foreground">${discount.revenue.toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

