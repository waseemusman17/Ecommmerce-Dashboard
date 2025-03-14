"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useIsMobile } from "@/hooks/use-mobile"

const data = [
  { name: "Electronics", value: 45 },
  { name: "Accessories", value: 25 },
  { name: "Clothing", value: 15 },
  { name: "Home & Kitchen", value: 10 },
  { name: "Other", value: 5 },
]

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export function SalesByCategory() {
  const isMobile = useIsMobile()

  return (
    <ChartContainer
      config={{
        Electronics: {
          label: "Electronics",
          color: COLORS[0],
        },
        Accessories: {
          label: "Accessories",
          color: COLORS[1],
        },
        Clothing: {
          label: "Clothing",
          color: COLORS[2],
        },
        "Home & Kitchen": {
          label: "Home & Kitchen",
          color: COLORS[3],
        },
        Other: {
          label: "Other",
          color: COLORS[4],
        },
      }}
      className="h-[250px] sm:h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={isMobile ? 60 : 80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-4">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-1 sm:gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            <span className="text-xs sm:text-sm">
              {entry.name} ({entry.value}%)
            </span>
          </div>
        ))}
      </div>
    </ChartContainer>
  )
}

