import { CustomersTable } from "@/components/dashboard/customers/customers-table"

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
      </div>
      <CustomersTable />
    </div>
  )
}

