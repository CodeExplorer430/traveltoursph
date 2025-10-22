"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, Edit2, Trash2, Download, Filter } from "lucide-react"
import AdminSidebar from "@/components/admin-sidebar"

interface Booking {
  id: string
  customer: string
  email: string
  package: string
  checkIn: string
  checkOut: string
  travelers: number
  amount: string
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed"
  paymentStatus: "Paid" | "Pending" | "Refunded"
}

const bookingsData: Booking[] = [
  {
    id: "BK001",
    customer: "John Doe",
    email: "john.doe@example.com",
    package: "Boracay Beach Paradise",
    checkIn: "2025-02-15",
    checkOut: "2025-02-18",
    travelers: 2,
    amount: "₱25,998",
    status: "Confirmed",
    paymentStatus: "Paid"
  },
  {
    id: "BK002",
    customer: "Jane Smith",
    email: "jane.smith@example.com",
    package: "Palawan Island Adventure",
    checkIn: "2025-03-10",
    checkOut: "2025-03-14",
    travelers: 3,
    amount: "₱47,997",
    status: "Pending",
    paymentStatus: "Pending"
  },
  {
    id: "BK003",
    customer: "Mike Johnson",
    email: "mike.j@example.com",
    package: "Cebu City Explorer",
    checkIn: "2024-12-20",
    checkOut: "2024-12-22",
    travelers: 2,
    amount: "₱19,998",
    status: "Completed",
    paymentStatus: "Paid"
  },
  {
    id: "BK004",
    customer: "Sarah Williams",
    email: "sarah.w@example.com",
    package: "Siargao Surfing Retreat",
    checkIn: "2025-01-15",
    checkOut: "2025-01-18",
    travelers: 4,
    amount: "₱47,996",
    status: "Confirmed",
    paymentStatus: "Paid"
  },
  {
    id: "BK005",
    customer: "Tom Brown",
    email: "tom.brown@example.com",
    package: "Banaue Rice Terraces Trek",
    checkIn: "2025-02-01",
    checkOut: "2025-02-03",
    travelers: 2,
    amount: "₱17,998",
    status: "Cancelled",
    paymentStatus: "Refunded"
  }
]

export default function BookingsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-success/10 text-success"
      case "Pending":
        return "bg-warning/10 text-warning"
      case "Completed":
        return "bg-primary/10 text-primary"
      case "Cancelled":
        return "bg-error/10 text-error"
      default:
        return "bg-neutral-100 text-neutral-600"
    }
  }

  const filteredBookings = bookingsData.filter((booking) => {
    const matchesSearch =
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.package.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking)
    setIsViewModalOpen(true)
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <AdminSidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Bookings Management</h1>
              <p className="text-sm text-neutral-600">View and manage all customer bookings</p>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neutral-900">{bookingsData.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Confirmed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">
                  {bookingsData.filter(b => b.status === "Confirmed").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">
                  {bookingsData.filter(b => b.status === "Pending").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {bookingsData.filter(b => b.status === "Completed").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search by booking ID, customer, or package..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button
                variant={statusFilter === "Confirmed" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("Confirmed")}
              >
                Confirmed
              </Button>
              <Button
                variant={statusFilter === "Pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("Pending")}
              >
                Pending
              </Button>
              <Button
                variant={statusFilter === "Completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("Completed")}
              >
                Completed
              </Button>
            </div>
          </div>

          {/* Bookings Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Bookings</CardTitle>
              <CardDescription>Showing {filteredBookings.length} bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Booking ID</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Customer</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Package</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Check-in</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Travelers</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-3 px-4 font-medium text-primary">{booking.id}</td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{booking.customer}</p>
                            <p className="text-xs text-neutral-600">{booking.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">{booking.package}</td>
                        <td className="py-3 px-4">{booking.checkIn}</td>
                        <td className="py-3 px-4">{booking.travelers}</td>
                        <td className="py-3 px-4 font-medium">{booking.amount}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewBooking(booking)}
                              title="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Edit booking">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Download voucher">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* View Modal */}
      {isViewModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <Card className="w-full max-w-2xl my-8">
            <CardHeader className="border-b border-neutral-200">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">Booking Details</CardTitle>
                  <p className="text-sm text-neutral-600 mt-1">Complete booking information</p>
                </div>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-neutral-500 hover:text-neutral-700 text-2xl leading-none"
                >
                  ✕
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className={`mb-6 p-4 rounded-lg ${getStatusColor(selectedBooking.status)}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase opacity-80">Status</p>
                    <p className="text-lg font-bold">{selectedBooking.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold uppercase opacity-80">Booking ID</p>
                    <p className="text-lg font-bold font-mono">{selectedBooking.id}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-neutral-900 border-b pb-2">Customer Information</h3>
                  <div>
                    <p className="text-sm text-neutral-600">Full Name</p>
                    <p className="font-medium text-neutral-900">{selectedBooking.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Email</p>
                    <p className="font-medium text-neutral-900">{selectedBooking.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Number of Travelers</p>
                    <p className="font-medium text-neutral-900">{selectedBooking.travelers} Travelers</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-neutral-900 border-b pb-2">Booking Information</h3>
                  <div>
                    <p className="text-sm text-neutral-600">Package</p>
                    <p className="font-medium text-neutral-900">{selectedBooking.package}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Check-in</p>
                    <p className="font-medium text-neutral-900">{selectedBooking.checkIn}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Check-out</p>
                    <p className="font-medium text-neutral-900">{selectedBooking.checkOut}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6 p-4 bg-neutral-50 rounded-lg">
                <h3 className="font-semibold text-lg text-neutral-900 mb-4">Payment Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Total Amount</span>
                    <span className="font-bold text-primary text-lg">{selectedBooking.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Payment Status</span>
                    <span className={`font-medium ${selectedBooking.paymentStatus === "Paid" ? "text-success" : "text-warning"}`}>
                      {selectedBooking.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setIsViewModalOpen(false)}>
                  Close
                </Button>
                <Button variant="outline" className="flex-1">
                  Download Voucher
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  Edit Booking
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
