"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Users, BookOpen, DollarSign, Eye, Edit2, Trash2 } from "lucide-react"
import AdminSidebar from "@/components/admin-sidebar"

const revenueData = [
  { month: "Jan", revenue: 4000, bookings: 24 },
  { month: "Feb", revenue: 3000, bookings: 18 },
  { month: "Mar", revenue: 2000, bookings: 15 },
  { month: "Apr", revenue: 2780, bookings: 20 },
  { month: "May", revenue: 1890, bookings: 14 },
  { month: "Jun", revenue: 2390, bookings: 22 },
]

const bookingStatusData = [
  { name: "Confirmed", value: 45, color: "#10B981" },
  { name: "Pending", value: 30, color: "#F59E0B" },
  { name: "Cancelled", value: 15, color: "#EF4444" },
  { name: "Completed", value: 10, color: "#0066CC" },
]

const recentBookings = [
  {
    id: "BK001",
    customer: "John Doe",
    package: "Boracay Beach Resort",
    amount: "$1,200",
    status: "Confirmed",
    date: "2024-01-15",
  },
  {
    id: "BK002",
    customer: "Jane Smith",
    package: "Palawan Island Hopping",
    amount: "$1,800",
    status: "Pending",
    date: "2024-01-14",
  },
  {
    id: "BK003",
    customer: "Mike Johnson",
    package: "Cebu City Tour",
    amount: "$900",
    status: "Confirmed",
    date: "2024-01-13",
  },
  {
    id: "BK004",
    customer: "Sarah Williams",
    package: "Siargao Surfing",
    amount: "$1,100",
    status: "Completed",
    date: "2024-01-12",
  },
  {
    id: "BK005",
    customer: "Tom Brown",
    package: "Boracay Beach Resort",
    amount: "$1,200",
    status: "Confirmed",
    date: "2024-01-11",
  },
]

interface BookingDetail {
  id: string
  customer: string
  package: string
  amount: string
  status: string
  date: string
}

export default function AdminDashboard() {
  const [selectedBooking, setSelectedBooking] = useState<BookingDetail | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

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

  const filteredBookings =
    statusFilter === "all" ? recentBookings : recentBookings.filter((b) => b.status === statusFilter)

  const handleViewBooking = (booking: BookingDetail) => {
    setSelectedBooking(booking)
    setIsViewModalOpen(true)
  }

  const handleEditBooking = (booking: BookingDetail) => {
    setSelectedBooking(booking)
    setIsEditModalOpen(true)
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <AdminSidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
              <p className="text-sm text-neutral-600">Analytics & Overview</p>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 overflow-auto">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$16,060</div>
              <p className="text-xs text-neutral-600">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <BookOpen className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">113</div>
              <p className="text-xs text-neutral-600">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              <Users className="w-4 h-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">847</div>
              <p className="text-xs text-neutral-600">+5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
              <TrendingUp className="w-4 h-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$142</div>
              <p className="text-xs text-neutral-600">+3% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue & Bookings Trend</CardTitle>
              <CardDescription>Last 6 months performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#0066CC" name="Revenue ($)" />
                  <Line type="monotone" dataKey="bookings" stroke="#FF6B35" name="Bookings" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Booking Status</CardTitle>
              <CardDescription>Distribution by status</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={bookingStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {bookingStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest booking activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4 flex-wrap">
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

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">Booking ID</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">Package</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-3 px-4 font-medium text-primary">{booking.id}</td>
                      <td className="py-3 px-4">{booking.customer}</td>
                      <td className="py-3 px-4">{booking.package}</td>
                      <td className="py-3 px-4 font-medium">{booking.amount}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-neutral-600">{booking.date}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewBooking(booking)}
                            title="View booking"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditBooking(booking)}
                            title="Edit booking"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Delete booking">
                            <Trash2 className="w-4 h-4 text-error" />
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
              {/* Booking Status Banner */}
              <div className={`mb-6 p-4 rounded-lg ${getStatusColor(selectedBooking.status)} flex items-center justify-between`}>
                <div>
                  <p className="text-xs font-semibold uppercase opacity-80">Status</p>
                  <p className="text-lg font-bold">{selectedBooking.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold uppercase opacity-80">Booking ID</p>
                  <p className="text-lg font-bold font-mono">{selectedBooking.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-neutral-900 border-b pb-2">Customer Information</h3>
                  <div>
                    <p className="text-sm text-neutral-600">Full Name</p>
                    <p className="font-medium text-neutral-900">{selectedBooking.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Email</p>
                    <p className="font-medium text-neutral-900">{selectedBooking.customer.toLowerCase().replace(' ', '.')}@example.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Phone</p>
                    <p className="font-medium text-neutral-900">+63 912 345 6789</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Number of Travelers</p>
                    <p className="font-medium text-neutral-900">2 Adults</p>
                  </div>
                </div>

                {/* Booking Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-neutral-900 border-b pb-2">Booking Information</h3>
                  <div>
                    <p className="text-sm text-neutral-600">Package</p>
                    <p className="font-medium text-neutral-900">{selectedBooking.package}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Booking Date</p>
                    <p className="font-medium text-neutral-900">{selectedBooking.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Travel Dates</p>
                    <p className="font-medium text-neutral-900">Feb 15, 2025 - Feb 18, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Duration</p>
                    <p className="font-medium text-neutral-900">3 Days / 2 Nights</p>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="mb-6 p-4 bg-neutral-50 rounded-lg">
                <h3 className="font-semibold text-lg text-neutral-900 mb-4">Payment Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Package Price</span>
                    <span className="font-medium">{selectedBooking.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Taxes & Fees</span>
                    <span className="font-medium">$144</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-neutral-200">
                    <span className="font-semibold text-neutral-900">Total Amount</span>
                    <span className="font-bold text-primary text-lg">{selectedBooking.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Payment Method</span>
                    <span className="font-medium">Credit Card (****1234)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Payment Status</span>
                    <span className="font-medium text-success">Paid</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setIsViewModalOpen(false)}>
                  Close
                </Button>
                <Button variant="outline" className="flex-1">
                  Download Invoice
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={() => {
                  setIsViewModalOpen(false)
                  handleEditBooking(selectedBooking)
                }}>
                  Edit Booking
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit Booking</CardTitle>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700"
              >
                ✕
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
                <select className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Confirmed</option>
                  <option>Pending</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Notes</label>
                <textarea
                  placeholder="Add notes about this booking..."
                  rows={3}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setIsEditModalOpen(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button onClick={() => setIsEditModalOpen(false)} className="flex-1 bg-primary hover:bg-primary/90">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
