"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

const data = [
  {
    name: "Jan",
    total: 1800,
  },
  {
    name: "Feb",
    total: 2200,
  },
  {
    name: "Mar",
    total: 2800,
  },
  {
    name: "Apr",
    total: 2400,
  },
  {
    name: "May",
    total: 2900,
  },
  {
    name: "Jun",
    total: 3300,
  },
  {
    name: "Jul",
    total: 3600,
  },
  {
    name: "Aug",
    total: 3200,
  },
  {
    name: "Sep",
    total: 3800,
  },
  {
    name: "Oct",
    total: 4000,
  },
  {
    name: "Nov",
    total: 4500,
  },
  {
    name: "Dec",
    total: 5200,
  },
]

export function Overview() {
  const isMobile = useIsMobile()
  const [chartData, setChartData] = useState(data)

  // For mobile, show fewer data points to avoid overcrowding
  useEffect(() => {
    if (isMobile) {
      // Show only every other month on mobile
      setChartData(data.filter((_, index) => index % 2 === 0))
    } else {
      setChartData(data)
    }
  }, [isMobile])

  return (
    <ChartContainer
      config={{
        total: {
          label: "Revenue",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[250px] sm:h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            tickMargin={8}
          />
          <YAxis
            stroke="#888888"
            fontSize={isMobile ? 10 : 12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${isMobile ? (value / 1000) + "k" : value}`}
            width={isMobile ? 40 : 50}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="total" radius={[4, 4, 0, 0]} className="fill-[var(--color-total)]" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

