"use client"

import { Line, LineChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useIsMobile } from "@/hooks/use-mobile"
import { useState, useEffect } from "react"

const data = [
  {
    month: "Jan",
    organic: 2400,
    social: 1800,
    email: 1200,
    paid: 900,
  },
  {
    month: "Feb",
    organic: 2600,
    social: 2100,
    email: 1400,
    paid: 1100,
  },
  {
    month: "Mar",
    organic: 2900,
    social: 2400,
    email: 1600,
    paid: 1300,
  },
  {
    month: "Apr",
    organic: 3100,
    social: 2200,
    email: 1800,
    paid: 1400,
  },
  {
    month: "May",
    organic: 3400,
    social: 2700,
    email: 2000,
    paid: 1600,
  },
  {
    month: "Jun",
    organic: 3700,
    social: 3000,
    email: 2200,
    paid: 1900,
  },
]

export function MarketingOverview() {
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
        organic: {
          label: "Organic",
          color: "hsl(var(--chart-1))",
        },
        social: {
          label: "Social",
          color: "hsl(var(--chart-2))",
        },
        email: {
          label: "Email",
          color: "hsl(var(--chart-3))",
        },
        paid: {
          label: "Paid Ads",
          color: "hsl(var(--chart-4))",
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
            stroke="#888888"
            fontSize={isMobile ? 10 : 12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${isMobile ? (value / 1000) + "k" : value}`}
            width={isMobile ? 40 : 50}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend layout={isMobile ? "horizontal" : "horizontal"} verticalAlign="bottom" />
          <Line
            type="monotone"
            dataKey="organic"
            stroke="var(--color-organic)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="social"
            stroke="var(--color-social)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="email"
            stroke="var(--color-email)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="paid"
            stroke="var(--color-paid)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

