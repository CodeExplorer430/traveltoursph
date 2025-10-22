"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  Users,
  BookOpen,
  BarChart3,
  Settings,
  CreditCard,
  Mail,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminSidebarProps {
  isCollapsed?: boolean
  onToggle?: () => void
}

export default function AdminSidebar({ isCollapsed = false, onToggle }: AdminSidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
      description: "Analytics & Overview"
    },
    {
      title: "Bookings",
      icon: BookOpen,
      href: "/admin/bookings",
      description: "Manage Bookings"
    },
    {
      title: "Packages",
      icon: Package,
      href: "/admin/packages",
      description: "Package Management"
    },
    {
      title: "Customers",
      icon: Users,
      href: "/admin/customers",
      description: "Customer Management"
    },
    {
      title: "Payments",
      icon: CreditCard,
      href: "/admin/payments",
      description: "Payment Transactions"
    },
    {
      title: "Reports",
      icon: BarChart3,
      href: "/admin/reports",
      description: "Analytics & Reports"
    },
    {
      title: "Notifications",
      icon: Mail,
      href: "/admin/notifications",
      description: "Email & SMS"
    },
    {
      title: "Inventory",
      icon: FileText,
      href: "/admin/inventory",
      description: "Inventory Management"
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/admin/settings",
      description: "System Settings"
    }
  ]

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <aside
      className={`bg-white border-r border-neutral-200 flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo/Header */}
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="text-xl font-bold text-primary">TravelTours</h2>
              <p className="text-xs text-neutral-600">Admin Panel</p>
            </div>
          )}
          {isCollapsed && (
            <div className="text-2xl font-bold text-primary mx-auto">TT</div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <li key={item.href}>
                <Link href={item.href}>
                  <div
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                      active
                        ? "bg-primary text-white"
                        : "text-neutral-700 hover:bg-neutral-100"
                    } ${isCollapsed ? "justify-center" : ""}`}
                    title={isCollapsed ? item.title : undefined}
                  >
                    <Icon className={`${isCollapsed ? "w-6 h-6" : "w-5 h-5"} flex-shrink-0`} />
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className={`text-xs ${active ? "text-white/80" : "text-neutral-500"}`}>
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-neutral-200">
        <Link href="/auth/login">
          <Button
            variant="outline"
            className={`w-full gap-2 ${isCollapsed ? "px-2" : ""}`}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut className={`${isCollapsed ? "w-5 h-5" : "w-4 h-4"}`} />
            {!isCollapsed && "Logout"}
          </Button>
        </Link>
      </div>

      {/* Toggle Button */}
      {onToggle && (
        <button
          onClick={onToggle}
          className="absolute -right-3 top-20 bg-white border border-neutral-200 rounded-full p-1 hover:bg-neutral-50 shadow-md"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-neutral-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-neutral-600" />
          )}
        </button>
      )}
    </aside>
  )
}
