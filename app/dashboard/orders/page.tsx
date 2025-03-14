import { OrdersTable } from "@/components/dashboard/orders/orders-table"

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
      </div>
      <OrdersTable />
    </div>
  )
}

