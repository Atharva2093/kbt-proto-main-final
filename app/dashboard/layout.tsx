"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Thermometer,
  LayoutDashboard,
  FlaskConical,
  Cpu,
  List,
  ShoppingCart,
  FileText,
  Settings,
  Bell,
  ChevronDown,
  User,
  Menu,
  X,
  LogOut,
  UserCircle,
} from "lucide-react"
import { useState } from "react"

const sidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/thermal-analysis", label: "Thermal Analysis", icon: FlaskConical },
  { href: "/dashboard/optimization", label: "Optimization Engine", icon: Cpu },
  { href: "/dashboard/materials", label: "Material List", icon: List },
  { href: "/dashboard/procurement", label: "Procurement", icon: ShoppingCart },
  { href: "/dashboard/reports", label: "Reports", icon: FileText },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  // Get user's initials
  const initials = user
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : "U"

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Thermometer className="h-6 w-6 text-sidebar-primary" />
            <span className="text-lg font-semibold text-sidebar-foreground">ThermalWall AI</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-primary"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="border-t border-sidebar-border p-4">
          <Link href="/">
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md lg:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  {user?.firstName || "Demo"} Project
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Office Building A</DropdownMenuItem>
                <DropdownMenuItem>Residential Complex</DropdownMenuItem>
                <DropdownMenuItem>Industrial Warehouse</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    {initials}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-semibold text-foreground">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                  <p className="text-xs text-muted-foreground mt-1">{user?.company}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="flex items-center gap-2 cursor-pointer">
                    <UserCircle className="h-4 w-4" />
                    Profile & Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </ProtectedRoute>
  )
}
