"use client"

import Link from "next/link"
import { Bell, Search, Settings, User, LogOut, ChevronRight, Moon, Sun, Laptop, Mail, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "next-themes"
import { Package } from "lucide-react"

export function DashboardHeader() {
  const { user, logout } = useAuth()
  const { setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Link href="/dashboard" className="hidden lg:block">
        <span className="text-xl font-bold">eCommerce</span>
      </Link>
      <div className="w-full flex-1">
        <form className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
          />
        </form>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full md:flex hidden">
          <Search className="h-5 w-5 md:hidden" />
          <span className="sr-only">Search</span>
        </Button>

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                3
              </span>
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[380px]">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-xs font-normal">
                Mark all as read
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              {/* Unread Notifications */}
              <div className="bg-muted/50 p-2">
                <p className="px-2 py-1.5 text-xs font-semibold">New</p>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <div className="flex w-full items-start gap-2">
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">New order received</p>
                      <p className="text-xs text-muted-foreground">Order #1234 from John Doe</p>
                    </div>
                    <p className="text-xs text-muted-foreground">2m ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <div className="flex w-full items-start gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Package className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Low stock alert</p>
                      <p className="text-xs text-muted-foreground">Premium Headphones (5 left)</p>
                    </div>
                    <p className="text-xs text-muted-foreground">1h ago</p>
                  </div>
                </DropdownMenuItem>
              </div>

              {/* Earlier Notifications */}
              <div className="p-2">
                <p className="px-2 py-1.5 text-xs font-semibold">Earlier</p>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <div className="flex w-full items-start gap-2">
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage src="/avatars/02.png" alt="Avatar" />
                      <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">New review</p>
                      <p className="text-xs text-muted-foreground">Sarah Davis left a 5-star review</p>
                    </div>
                    <p className="text-xs text-muted-foreground">1d ago</p>
                  </div>
                </DropdownMenuItem>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center font-medium" asChild>
              <Link href="/dashboard/notifications">View all notifications</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full hidden md:flex">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Store Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                <span>Team Members</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                <span>Email Templates</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span>Theme</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      <Sun className="mr-2 h-4 w-4" />
                      <span>Light</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      <Moon className="mr-2 h-4 w-4" />
                      <span>Dark</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      <Laptop className="mr-2 h-4 w-4" />
                      <span>System</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>All Settings</span>
                <ChevronRight className="ml-auto h-4 w-4" />
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              {user ? (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar || ""} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <User className="h-5 w-5" />
              )}
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              {user ? (
                <div className="flex flex-col">
                  <span>{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              ) : (
                "My Account"
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

