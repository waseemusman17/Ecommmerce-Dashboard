import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const campaigns = [
  {
    name: "Summer Sale",
    status: "Active",
    progress: 65,
    daysLeft: 12,
  },
  {
    name: "New Customer Discount",
    status: "Active",
    progress: 100,
    daysLeft: "Ongoing",
  },
  {
    name: "Referral Program",
    status: "Active",
    progress: 100,
    daysLeft: "Ongoing",
  },
  {
    name: "Holiday Special",
    status: "Scheduled",
    progress: 0,
    daysLeft: 45,
  },
]

export function ActiveCampaigns() {
  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <div key={campaign.name} className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">{campaign.name}</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant={campaign.status === "Active" ? "default" : "outline"}>{campaign.status}</Badge>
                {typeof campaign.daysLeft === "number" ? (
                  <span>{campaign.daysLeft} days left</span>
                ) : (
                  <span>{campaign.daysLeft}</span>
                )}
              </div>
            </div>
          </div>
          <Progress value={campaign.progress} className="h-2" />
        </div>
      ))}
    </div>
  )
}

