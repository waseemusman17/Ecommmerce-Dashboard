import { CampaignsTable } from "@/components/dashboard/marketing/campaigns-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function CampaignsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Marketing Campaigns</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>
      <CampaignsTable />
    </div>
  )
}

