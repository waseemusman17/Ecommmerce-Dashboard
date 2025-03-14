import { AbandonedCartsTable } from "@/components/dashboard/orders/abandoned-carts-table"

export default function AbandonedCartsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Abandoned Carts</h1>
      </div>
      <AbandonedCartsTable />
    </div>
  )
}

