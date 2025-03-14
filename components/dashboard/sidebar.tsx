"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  ChevronDown,
  ChevronRight,
  Package,
  ShoppingCart,
  Tag,
  Users,
  Settings,
  Home,
  LayoutDashboard,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: Package,
    subItems: [
      { title: "All Products", href: "/dashboard/products" },
      { title: "Add Product", href: "/dashboard/products/new" },
      { title: "Categories", href: "/dashboard/products/categories" },
    ],
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
    subItems: [
      { title: "All Orders", href: "/dashboard/orders" },
      { title: "Abandoned Carts", href: "/dashboard/orders/abandoned" },
    ],
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Marketing",
    href: "/dashboard/marketing",
    icon: Tag,
    subItems: [
      { title: "Discounts", href: "/dashboard/marketing/discounts" },
      { title: "Campaigns", href: "/dashboard/marketing/campaigns" },
    ],
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  // Initialize expanded state based on current path
  useEffect(() => {
    const newExpandedItems: Record<string, boolean> = {}

    sidebarLinks.forEach((link) => {
      if (link.subItems && (pathname === link.href || pathname.startsWith(link.href + "/"))) {
        newExpandedItems[link.href] = true
      }
    })

    setExpandedItems(newExpandedItems)
  }, [pathname])

  // Toggle expanded state for a link
  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [href]: !prev[href],
    }))
  }

  // Check if a link or any of its subitems is active
  const isLinkActive = (link: (typeof sidebarLinks)[0]) => {
    if (pathname === link.href) return true

    if (link.subItems) {
      return link.subItems.some(
        (subItem) =>
          pathname === subItem.href || (subItem.href !== "/dashboard" && pathname.startsWith(subItem.href + "/")),
      )
    }

    return link.href !== "/dashboard" && pathname.startsWith(link.href + "/")
  }

  return (
    <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Home className="h-6 w-6" />
          <span>Home</span>
        </Link>
      </div>
      <nav className="grid gap-1 p-4 text-sm font-medium">
        {sidebarLinks.map((link) => {
          const isActive = isLinkActive(link)
          const isExpanded = !!expandedItems[link.href]

          if (link.subItems) {
            return (
              <div key={link.href} className="w-full">
                <div className="flex w-full items-center">
                  <Button variant={isActive ? "secondary" : "ghost"} className="w-full justify-start gap-2" asChild>
                    <Link href={link.href}>
                      <link.icon className="h-4 w-4" />
                      <span className="flex-1 text-left">{link.title}</span>
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-8 w-8 p-0"
                    onClick={() => toggleExpanded(link.href)}
                  >
                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    <span className="sr-only">Toggle</span>
                  </Button>
                </div>

                {isExpanded && (
                  <div className="pl-6 mt-1">
                    {link.subItems.map((subItem) => {
                      const isSubActive =
                        pathname === subItem.href ||
                        (subItem.href !== "/dashboard" && pathname.startsWith(subItem.href + "/"))

                      return (
                        <Button
                          key={subItem.href}
                          variant={isSubActive ? "secondary" : "ghost"}
                          className="mt-1 w-full justify-start"
                          asChild
                        >
                          <Link href={subItem.href}>{subItem.title}</Link>
                        </Button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          }

          return (
            <Button
              key={link.href}
              variant={isActive ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
              asChild
            >
              <Link href={link.href}>
                <link.icon className="h-4 w-4" />
                {link.title}
              </Link>
            </Button>
          )
        })}
      </nav>
    </aside>
  )
}

