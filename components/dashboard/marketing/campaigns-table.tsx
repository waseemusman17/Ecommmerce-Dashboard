"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, MoreHorizontal, Trash, Copy, BarChart, Send, Pause, Play } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for campaigns
const campaigns = [
  {
    id: "1",
    name: "Summer Sale",
    type: "Email",
    audience: "All Customers",
    startDate: "2023-06-01",
    endDate: "2025-08-31",
    status: "Active",
    progress: 65,
  },
  {
    id: "2",
    name: "New Customer Discount",
    type: "Email & Push",
    audience: "New Customers",
    startDate: "2023-01-01",
    endDate: null,
    status: "Active",
    progress: 100,
  },
  {
    id: "3",
    name: "Referral Program",
    type: "Social Media",
    audience: "All Customers",
    startDate: "2023-03-15",
    endDate: null,
    status: "Active",
    progress: 100,
  },
  {
    id: "4",
    name: "Holiday Special",
    type: "Email & Social",
    audience: "All Customers",
    startDate: "2025-12-01",
    endDate: "2025-12-31",
    status: "Scheduled",
    progress: 0,
  },
  {
    id: "5",
    name: "Abandoned Cart Recovery",
    type: "Email",
    audience: "Cart Abandoners",
    startDate: "2023-05-01",
    endDate: null,
    status: "Active",
    progress: 100,
  },
  {
    id: "6",
    name: "Black Friday Deals",
    type: "Email & Push & Social",
    audience: "All Customers",
    startDate: "2024-11-25",
    endDate: "2024-11-30",
    status: "Draft",
    progress: 0,
  },
  {
    id: "7",
    name: "Spring Collection Launch",
    type: "Email & Social",
    audience: "Previous Customers",
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    status: "Completed",
    progress: 100,
  },
]

export function CampaignsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Filter campaigns based on search term and filters
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter
    const matchesType =
      typeFilter === "all" ||
      (typeFilter === "Email" && campaign.type.includes("Email")) ||
      (typeFilter === "Social" && campaign.type.includes("Social")) ||
      (typeFilter === "Push" && campaign.type.includes("Push"))
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          placeholder="Search campaigns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:max-w-xs"
        />
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Scheduled">Scheduled</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Paused">Paused</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Campaign Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Email">Email</SelectItem>
              <SelectItem value="Social">Social Media</SelectItem>
              <SelectItem value="Push">Push Notification</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="rounded-md border hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Audience</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCampaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell>{campaign.type}</TableCell>
                <TableCell>{campaign.audience}</TableCell>
                <TableCell>{new Date(campaign.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : "Ongoing"}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      campaign.status === "Active"
                        ? "default"
                        : campaign.status === "Completed"
                          ? "success"
                          : campaign.status === "Paused"
                            ? "warning"
                            : "secondary"
                    }
                  >
                    {campaign.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={campaign.progress} className="h-2 w-16" />
                    <span className="text-xs">{campaign.progress}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BarChart className="mr-2 h-4 w-4" />
                        View Analytics
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {campaign.status === "Active" ? (
                        <DropdownMenuItem>
                          <Pause className="mr-2 h-4 w-4" />
                          Pause Campaign
                        </DropdownMenuItem>
                      ) : campaign.status === "Paused" ? (
                        <DropdownMenuItem>
                          <Play className="mr-2 h-4 w-4" />
                          Resume Campaign
                        </DropdownMenuItem>
                      ) : campaign.status === "Draft" ? (
                        <DropdownMenuItem>
                          <Send className="mr-2 h-4 w-4" />
                          Activate Campaign
                        </DropdownMenuItem>
                      ) : null}
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{campaign.name}</CardTitle>
                <Badge
                  variant={
                    campaign.status === "Active"
                      ? "default"
                      : campaign.status === "Completed"
                        ? "success"
                        : campaign.status === "Paused"
                          ? "warning"
                          : "secondary"
                  }
                >
                  {campaign.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <span className="ml-2 font-medium">{campaign.type}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Audience:</span>
                  <span className="ml-2 font-medium">{campaign.audience}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Start Date:</span>
                  <span className="ml-2 font-medium">{new Date(campaign.startDate).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">End Date:</span>
                  <span className="ml-2 font-medium">
                    {campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : "Ongoing"}
                  </span>
                </div>
                <div className="col-span-2 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Progress:</span>
                    <Progress value={campaign.progress} className="h-2 flex-1" />
                    <span className="text-xs">{campaign.progress}%</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="mr-1 h-3 w-3" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart className="mr-1 h-3 w-3" />
                  Analytics
                </Button>
                {campaign.status === "Active" ? (
                  <Button variant="outline" size="sm">
                    <Pause className="mr-1 h-3 w-3" />
                    Pause
                  </Button>
                ) : campaign.status === "Paused" ? (
                  <Button variant="outline" size="sm">
                    <Play className="mr-1 h-3 w-3" />
                    Resume
                  </Button>
                ) : campaign.status === "Draft" ? (
                  <Button variant="outline" size="sm">
                    <Send className="mr-1 h-3 w-3" />
                    Activate
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

