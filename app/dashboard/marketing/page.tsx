import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketingOverview } from "@/components/dashboard/marketing/marketing-overview"
import { ActiveCampaigns } from "@/components/dashboard/marketing/active-campaigns"
import { DiscountPerformance } from "@/components/dashboard/marketing/discount-performance"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MarketingPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Marketing</h1>
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
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.28%</div>
            <p className="text-xs text-muted-foreground">+1.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Marketing ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">327%</div>
            <p className="text-xs text-muted-foreground">+28% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">3 ending this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Open Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.8%</div>
            <p className="text-xs text-muted-foreground">+3.1% from last campaign</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-6">
        <Card className="col-span-1 md:col-span-6 lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Marketing Performance</CardTitle>
              <CardDescription>Channel performance over time</CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard/marketing/campaigns">View All Campaigns</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            <MarketingOverview />
          </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-3 lg:col-span-2">
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
            <CardDescription>Currently running marketing campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <ActiveCampaigns />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Discount Performance</CardTitle>
              <CardDescription>Coupon and discount usage</CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard/marketing/discounts">View All Discounts</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <DiscountPerformance />
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Marketing Channels</CardTitle>
            <CardDescription>Traffic and conversion by source</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-sm font-medium">Organic Search</span>
                </div>
                <span className="text-sm font-medium">32%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[32%] rounded-full bg-primary"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium">Social Media</span>
                </div>
                <span className="text-sm font-medium">24%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[24%] rounded-full bg-blue-500"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium">Email Marketing</span>
                </div>
                <span className="text-sm font-medium">18%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[18%] rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <span className="text-sm font-medium">Paid Advertising</span>
                </div>
                <span className="text-sm font-medium">14%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[14%] rounded-full bg-yellow-500"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span className="text-sm font-medium">Direct / Referral</span>
                </div>
                <span className="text-sm font-medium">12%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[12%] rounded-full bg-purple-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

