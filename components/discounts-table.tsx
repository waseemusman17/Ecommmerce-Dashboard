"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, MoreHorizontal, Trash, Copy } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for discounts
const discounts = [
  {
    id: "1",
    code: "SUMMER20",
    type: "Percentage",
    value: 20,
    minPurchase: 50,
    usageLimit: 1000,
    usageCount: 345,
    status: "Active",
    expiryDate: "2025-08-31",
  },
  {
    id: "2",
    code: "WELCOME10",
    type: "Percentage",
    value: 10,
    minPurchase: 0,
    usageLimit: null,
    usageCount: 289,
    status: "Active",
    expiryDate: null,
  },
  {
    id: "3",
    code: "FLASH50",
    type: "Percentage",
    value: 50,
    minPurchase: 100,
    usageLimit: 200,
    usageCount: 156,
    status: "Expired",
    expiryDate: "2023-12-31",
  },
  {
    id: "4",
    code: "FREESHIP",
    type: "Free Shipping",
    value: null,
    minPurchase: 75,
    usageLimit: 500,
    usageCount: 423,
    status: "Active",
    expiryDate: "2025-06-30",
  },
  {
    id: "5",
    code: "FIXED20",
    type: "Fixed Amount",
    value: 20,
    minPurchase: 50,
    usageLimit: 300,
    usageCount: 112,
    status: "Active",
    expiryDate: "2025-07-15",
  },
  {
    id: "6",
    code: "LOYALTY15",
    type: "Percentage",
    value: 15,
    minPurchase: 0,
    usageLimit: null,
    usageCount: 678,
    status: "Active",
    expiryDate: null,
  },
]

export function DiscountsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Filter discounts based on search term and filters
  const filteredDiscounts = discounts.filter((discount) => {
    const matchesSearch = discount.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || discount.status === statusFilter
    const matchesType = typeFilter === "all" || discount.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          placeholder="Search discounts..."
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
              <SelectItem value="Expired">Expired</SelectItem>
              <SelectItem value="Scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Discount Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Percentage">Percentage</SelectItem>
              <SelectItem value="Fixed Amount">Fixed Amount</SelectItem>
              <SelectItem value="Free Shipping">Free Shipping</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="rounded-md border hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Min. Purchase</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDiscounts.map((discount) => (
              <TableRow key={discount.id}>
                <TableCell className="font-medium">{discount.code}</TableCell>
                <TableCell>{discount.type}</TableCell>
                <TableCell>
                  {discount.type === "Percentage"
                    ? `${discount.value}%`
                    : discount.type === "Fixed Amount"
                      ? `$${discount.value}`
                      : "N/A"}
                </TableCell>
                <TableCell>{discount.minPurchase > 0 ? `$${discount.minPurchase}` : "None"}</TableCell>
                <TableCell>
                  {discount.usageCount} / {discount.usageLimit ? discount.usageLimit : "∞"}
                </TableCell>
                <TableCell>
                  {discount.expiryDate ? new Date(discount.expiryDate).toLocaleDateString() : "Never"}
                </TableCell>
                <TableCell>
                  <Badge variant={discount.status === "Active" ? "default" : "secondary"}>{discount.status}</Badge>
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
                      <DropdownMenuSeparator />
                      <DropdownMenuItem disabled={discount.status !== "Active"}>Deactivate</DropdownMenuItem>
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
        {filteredDiscounts.map((discount) => (
          <Card key={discount.id}>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{discount.code}</CardTitle>
                <Badge variant={discount.status === "Active" ? "default" : "secondary"}>{discount.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <span className="ml-2 font-medium">{discount.type}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Value:</span>
                  <span className="ml-2 font-medium">
                    {discount.type === "Percentage"
                      ? `${discount.value}%`
                      : discount.type === "Fixed Amount"
                        ? `$${discount.value}`
                        : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Min. Purchase:</span>
                  <span className="ml-2 font-medium">
                    {discount.minPurchase > 0 ? `$${discount.minPurchase}` : "None"}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Usage:</span>
                  <span className="ml-2 font-medium">
                    {discount.usageCount} / {discount.usageLimit ? discount.usageLimit : "∞"}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Expiry:</span>
                  <span className="ml-2 font-medium">
                    {discount.expiryDate ? new Date(discount.expiryDate).toLocaleDateString() : "Never"}
                  </span>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="mr-1 h-3 w-3" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="mr-1 h-3 w-3" />
                  Duplicate
                </Button>
                <Button variant="outline" size="sm" className="text-destructive">
                  <Trash className="mr-1 h-3 w-3" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

