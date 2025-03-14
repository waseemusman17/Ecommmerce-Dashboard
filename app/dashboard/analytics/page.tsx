import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SalesChart } from "@/components/dashboard/analytics/sales-chart"
import { VisitorsChart } from "@/components/dashboard/analytics/visitors-chart"
import { TopProducts } from "@/components/dashboard/analytics/top-products"
import { SalesByCategory } from "@/components/dashboard/analytics/sales-by-category"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <Tabs defaultValue="30days" className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-4 sm:w-auto">
            <TabsTrigger value="7days">7 days</TabsTrigger>
            <TabsTrigger value="30days">30 days</TabsTrigger>
            <TabsTrigger value="90days">90 days</TabsTrigger>
            <TabsTrigger value="12months">12 months</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$54.32</div>
            <p className="text-xs text-muted-foreground">+2.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">832</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly revenue and order count</CardDescription>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            <SalesChart />
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Visitors</CardTitle>
            <CardDescription>Daily unique visitors and page views</CardDescription>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            <VisitorsChart />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best selling products by revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <TopProducts />
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Revenue distribution by product category</CardDescription>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            <SalesByCategory />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

