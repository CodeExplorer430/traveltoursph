"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, Edit2, Trash2, Mail, Phone } from "lucide-react"
import AdminSidebar from "@/components/admin-sidebar"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  totalBookings: number
  totalSpent: string
  joinDate: string
  status: "Active" | "Inactive" | "VIP"
}

const customersData: Customer[] = [
  {
    id: "CUS001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+63 912 345 6789",
    totalBookings: 5,
    totalSpent: "₱125,990",
    joinDate: "2024-01-15",
    status: "VIP"
  },
  {
    id: "CUS002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+63 923 456 7890",
    totalBookings: 3,
    totalSpent: "₱87,995",
    joinDate: "2024-03-20",
    status: "Active"
  },
  {
    id: "CUS003",
    name: "Mike Johnson",
    email: "mike.j@example.com",
    phone: "+63 934 567 8901",
    totalBookings: 2,
    totalSpent: "₱39,996",
    joinDate: "2024-05-10",
    status: "Active"
  },
  {
    id: "CUS004",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    phone: "+63 945 678 9012",
    totalBookings: 4,
    totalSpent: "₱95,992",
    joinDate: "2024-02-28",
    status: "Active"
  },
  {
    id: "CUS005",
    name: "Tom Brown",
    email: "tom.brown@example.com",
    phone: "+63 956 789 0123",
    totalBookings: 1,
    totalSpent: "₱17,998",
    joinDate: "2024-06-15",
    status: "Active"
  },
  {
    id: "CUS006",
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "+63 967 890 1234",
    totalBookings: 7,
    totalSpent: "₱189,986",
    joinDate: "2023-11-05",
    status: "VIP"
  },
  {
    id: "CUS007",
    name: "Robert Lee",
    email: "robert.lee@example.com",
    phone: "+63 978 901 2345",
    totalBookings: 0,
    totalSpent: "₱0",
    joinDate: "2024-08-22",
    status: "Inactive"
  }
]

export default function CustomersPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-success/10 text-success"
      case "VIP":
        return "bg-primary/10 text-primary"
      case "Inactive":
        return "bg-neutral-200 text-neutral-600"
      default:
        return "bg-neutral-100 text-neutral-600"
    }
  }

  const filteredCustomers = customersData.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)

    return matchesSearch
  })

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsViewModalOpen(true)
  }

  const totalRevenue = customersData.reduce((sum, customer) => {
    const amount = parseFloat(customer.totalSpent.replace(/[₱,]/g, ''))
    return sum + (isNaN(amount) ? 0 : amount)
  }, 0)

  const vipCustomers = customersData.filter(c => c.status === "VIP").length
  const activeCustomers = customersData.filter(c => c.status === "Active" || c.status === "VIP").length

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <AdminSidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Customers Management</h1>
              <p className="text-sm text-neutral-600">View and manage all customer accounts</p>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Total Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neutral-900">{customersData.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Active Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">{activeCustomers}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">VIP Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{vipCustomers}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neutral-900">₱{totalRevenue.toLocaleString()}</div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search by name, email, phone, or customer ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button variant="default">
              Add New Customer
            </Button>
          </div>

          {/* Customers Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Customers</CardTitle>
              <CardDescription>Showing {filteredCustomers.length} customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Customer ID</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Contact</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Total Bookings</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Total Spent</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Join Date</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-3 px-4 font-medium text-primary">{customer.id}</td>
                        <td className="py-3 px-4 font-medium">{customer.name}</td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1 text-xs">
                              <Mail className="w-3 h-3" />
                              <span className="text-neutral-600">{customer.email}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              <Phone className="w-3 h-3" />
                              <span className="text-neutral-600">{customer.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{customer.totalBookings}</td>
                        <td className="py-3 px-4 font-medium">{customer.totalSpent}</td>
                        <td className="py-3 px-4">{customer.joinDate}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                            {customer.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewCustomer(customer)}
                              title="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Edit customer">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Delete customer">
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
      {isViewModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <Card className="w-full max-w-2xl my-8">
            <CardHeader className="border-b border-neutral-200">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">Customer Details</CardTitle>
                  <p className="text-sm text-neutral-600 mt-1">Complete customer information</p>
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
              <div className={`mb-6 p-4 rounded-lg ${getStatusColor(selectedCustomer.status)}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase opacity-80">Status</p>
                    <p className="text-lg font-bold">{selectedCustomer.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold uppercase opacity-80">Customer ID</p>
                    <p className="text-lg font-bold font-mono">{selectedCustomer.id}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-neutral-900 border-b pb-2">Personal Information</h3>
                  <div>
                    <p className="text-sm text-neutral-600">Full Name</p>
                    <p className="font-medium text-neutral-900">{selectedCustomer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Email</p>
                    <p className="font-medium text-neutral-900">{selectedCustomer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Phone</p>
                    <p className="font-medium text-neutral-900">{selectedCustomer.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Member Since</p>
                    <p className="font-medium text-neutral-900">{selectedCustomer.joinDate}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-neutral-900 border-b pb-2">Booking Statistics</h3>
                  <div>
                    <p className="text-sm text-neutral-600">Total Bookings</p>
                    <p className="font-medium text-neutral-900">{selectedCustomer.totalBookings} Bookings</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Total Spent</p>
                    <p className="font-bold text-primary text-xl">{selectedCustomer.totalSpent}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Average Per Booking</p>
                    <p className="font-medium text-neutral-900">
                      {selectedCustomer.totalBookings > 0
                        ? `₱${(parseFloat(selectedCustomer.totalSpent.replace(/[₱,]/g, '')) / selectedCustomer.totalBookings).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                        : '₱0'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setIsViewModalOpen(false)}>
                  Close
                </Button>
                <Button variant="outline" className="flex-1">
                  View Bookings
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  Edit Customer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
