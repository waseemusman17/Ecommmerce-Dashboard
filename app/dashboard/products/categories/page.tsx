import { CategoryManager } from "@/components/dashboard/products/category-manager"

export default function CategoriesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Product Categories</h1>
      </div>
      <CategoryManager />
    </div>
  )
}

