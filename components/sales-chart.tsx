"use client"

import { Line, LineChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useIsMobile } from "@/hooks/use-mobile"
import { useEffect, useState } from "react"

const data = [
  {
    month: "Jan",
    revenue: 4000,
    orders: 240,
  },
  {
    month: "Feb",
    revenue: 4500,
    orders: 270,
  },
  {
    month: "Mar",
    revenue: 6000,
    orders: 350,
  },
  {
    month: "Apr",
    revenue: 5500,
    orders: 320,
  },
  {
    month: "May",
    revenue: 7000,
    orders: 390,
  },
  {
    month: "Jun",
    revenue: 8500,
    orders: 450,
  },
  {
    month: "Jul",
    revenue: 9000,
    orders: 470,
  },
  {
    month: "Aug",
    revenue: 8700,
    orders: 460,
  },
  {
    month: "Sep",
    revenue: 9500,
    orders: 500,
  },
  {
    month: "Oct",
    revenue: 10000,
    orders: 520,
  },
  {
    month: "Nov",
    revenue: 11000,
    orders: 570,
  },
  {
    month: "Dec",
    revenue: 12000,
    orders: 600,
  },
]

export function SalesChart() {
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
        revenue: {
          label: "Revenue",
          color: "hsl(var(--chart-1))",
        },
        orders: {
          label: "Orders",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[250px] sm:h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            stroke="#888888"
            fontSize={isMobile ? 10 : 12}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis
            yAxisId="left"
            stroke="#888888"
            fontSize={isMobile ? 10 : 12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${isMobile ? (value / 1000) + "k" : value}`}
            width={isMobile ? 40 : 50}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#888888"
            fontSize={isMobile ? 10 : 12}
            tickLine={false}
            axisLine={false}
            width={isMobile ? 30 : 40}
            hide={isMobile}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="revenue"
            stroke="var(--color-revenue)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="orders"
            stroke="var(--color-orders)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

