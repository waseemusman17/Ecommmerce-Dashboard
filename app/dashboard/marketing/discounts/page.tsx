import { DiscountsTable } from "@/components/dashboard/marketing/discounts-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function DiscountsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Discount Codes</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Discount
        </Button>
      </div>
      <DiscountsTable />
    </div>
  )
}

