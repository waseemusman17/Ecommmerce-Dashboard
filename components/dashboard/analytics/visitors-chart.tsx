"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useIsMobile } from "@/hooks/use-mobile"
import { useEffect, useState } from "react"

const data = [
  {
    date: "2023-05-01",
    visitors: 1200,
    pageViews: 3200,
  },
  {
    date: "2023-05-02",
    visitors: 1300,
    pageViews: 3500,
  },
  {
    date: "2023-05-03",
    visitors: 1400,
    pageViews: 3800,
  },
  {
    date: "2023-05-04",
    visitors: 1500,
    pageViews: 4000,
  },
  {
    date: "2023-05-05",
    visitors: 1600,
    pageViews: 4200,
  },
  {
    date: "2023-05-06",
    visitors: 1350,
    pageViews: 3600,
  },
  {
    date: "2023-05-07",
    visitors: 1200,
    pageViews: 3200,
  },
  {
    date: "2023-05-08",
    visitors: 1400,
    pageViews: 3700,
  },
  {
    date: "2023-05-09",
    visitors: 1500,
    pageViews: 3900,
  },
  {
    date: "2023-05-10",
    visitors: 1600,
    pageViews: 4100,
  },
  {
    date: "2023-05-11",
    visitors: 1700,
    pageViews: 4300,
  },
  {
    date: "2023-05-12",
    visitors: 1800,
    pageViews: 4500,
  },
  {
    date: "2023-05-13",
    visitors: 1700,
    pageViews: 4300,
  },
  {
    date: "2023-05-14",
    visitors: 1600,
    pageViews: 4100,
  },
]

export function VisitorsChart() {
  const isMobile = useIsMobile()
  const [chartData, setChartData] = useState(data)

  // For mobile, show fewer data points to avoid overcrowding
  useEffect(() => {
    if (isMobile) {
      // Show only every third day on mobile
      setChartData(data.filter((_, index) => index % 3 === 0))
    } else {
      setChartData(data)
    }
  }, [isMobile])

  return (
    <ChartContainer
      config={{
        visitors: {
          label: "Visitors",
          color: "hsl(var(--chart-3))",
        },
        pageViews: {
          label: "Page Views",
          color: "hsl(var(--chart-4))",
        },
      }}
      className="h-[250px] sm:h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={isMobile ? 10 : 12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => {
              const date = new Date(value)
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            }}
            tickMargin={8}
          />
          <YAxis
            stroke="#888888"
            fontSize={isMobile ? 10 : 12}
            tickLine={false}
            axisLine={false}
            width={isMobile ? 40 : 50}
            tickFormatter={(value) => (isMobile ? value / 1000 + "k" : value)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="pageViews"
            stroke="var(--color-pageViews)"
            fill="var(--color-pageViews)"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="visitors"
            stroke="var(--color-visitors)"
            fill="var(--color-visitors)"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

