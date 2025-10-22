"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, Download, RefreshCw } from "lucide-react"
import AdminSidebar from "@/components/admin-sidebar"

interface Payment {
  id: string
  transactionId: string
  customer: string
  bookingId: string
  amount: string
  paymentMethod: "Credit Card" | "Debit Card" | "PayPal" | "Bank Transfer" | "GCash" | "Maya"
  status: "Paid" | "Pending" | "Refunded" | "Failed"
  date: string
  time: string
}

const paymentsData: Payment[] = [
  {
    id: "PAY001",
    transactionId: "TXN20250215001",
    customer: "John Doe",
    bookingId: "BK001",
    amount: "₱25,998",
    paymentMethod: "Credit Card",
    status: "Paid",
    date: "2025-02-15",
    time: "14:23:45"
  },
  {
    id: "PAY002",
    transactionId: "TXN20250310002",
    customer: "Jane Smith",
    bookingId: "BK002",
    amount: "₱47,997",
    paymentMethod: "GCash",
    status: "Pending",
    date: "2025-03-10",
    time: "09:15:22"
  },
  {
    id: "PAY003",
    transactionId: "TXN20241220003",
    customer: "Mike Johnson",
    bookingId: "BK003",
    amount: "₱19,998",
    paymentMethod: "PayPal",
    status: "Paid",
    date: "2024-12-20",
    time: "16:45:12"
  },
  {
    id: "PAY004",
    transactionId: "TXN20250115004",
    customer: "Sarah Williams",
    bookingId: "BK004",
    amount: "₱47,996",
    paymentMethod: "Maya",
    status: "Paid",
    date: "2025-01-15",
    time: "11:30:05"
  },
  {
    id: "PAY005",
    transactionId: "TXN20250201005",
    customer: "Tom Brown",
    bookingId: "BK005",
    amount: "₱17,998",
    paymentMethod: "Bank Transfer",
    status: "Refunded",
    date: "2025-02-01",
    time: "13:20:33"
  },
  {
    id: "PAY006",
    transactionId: "TXN20250305006",
    customer: "Emily Davis",
    bookingId: "BK006",
    amount: "₱35,999",
    paymentMethod: "Credit Card",
    status: "Failed",
    date: "2025-03-05",
    time: "10:12:55"
  },
  {
    id: "PAY007",
    transactionId: "TXN20250220007",
    customer: "Robert Lee",
    bookingId: "BK007",
    amount: "₱29,997",
    paymentMethod: "Debit Card",
    status: "Paid",
    date: "2025-02-20",
    time: "15:40:18"
  }
]

export default function PaymentsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-success/10 text-success"
      case "Pending":
        return "bg-warning/10 text-warning"
      case "Refunded":
        return "bg-primary/10 text-primary"
      case "Failed":
        return "bg-error/10 text-error"
      default:
        return "bg-neutral-100 text-neutral-600"
    }
  }

  const filteredPayments = paymentsData.filter((payment) => {
    const matchesSearch =
      payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.bookingId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || payment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewPayment = (payment: Payment) => {
    setSelectedPayment(payment)
    setIsViewModalOpen(true)
  }

  const totalRevenue = paymentsData
    .filter(p => p.status === "Paid")
    .reduce((sum, payment) => {
      const amount = parseFloat(payment.amount.replace(/[₱,]/g, ''))
      return sum + (isNaN(amount) ? 0 : amount)
    }, 0)

  const pendingAmount = paymentsData
    .filter(p => p.status === "Pending")
    .reduce((sum, payment) => {
      const amount = parseFloat(payment.amount.replace(/[₱,]/g, ''))
      return sum + (isNaN(amount) ? 0 : amount)
    }, 0)

  const refundedAmount = paymentsData
    .filter(p => p.status === "Refunded")
    .reduce((sum, payment) => {
      const amount = parseFloat(payment.amount.replace(/[₱,]/g, ''))
      return sum + (isNaN(amount) ? 0 : amount)
    }, 0)

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <AdminSidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Payments Management</h1>
              <p className="text-sm text-neutral-600">View and manage all payment transactions</p>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">₱{totalRevenue.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Pending Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">₱{pendingAmount.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Refunded</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">₱{refundedAmount.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Total Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neutral-900">{paymentsData.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search by transaction ID, booking ID, or customer..."
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
                variant={statusFilter === "Paid" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("Paid")}
              >
                Paid
              </Button>
              <Button
                variant={statusFilter === "Pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("Pending")}
              >
                Pending
              </Button>
              <Button
                variant={statusFilter === "Refunded" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("Refunded")}
              >
                Refunded
              </Button>
              <Button
                variant={statusFilter === "Failed" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("Failed")}
              >
                Failed
              </Button>
            </div>
          </div>

          {/* Payments Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>Showing {filteredPayments.length} transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Transaction ID</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Customer</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Booking ID</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Payment Method</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((payment) => (
                      <tr key={payment.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-3 px-4 font-medium text-primary">{payment.transactionId}</td>
                        <td className="py-3 px-4">{payment.customer}</td>
                        <td className="py-3 px-4">{payment.bookingId}</td>
                        <td className="py-3 px-4 font-medium">{payment.amount}</td>
                        <td className="py-3 px-4">{payment.paymentMethod}</td>
                        <td className="py-3 px-4">
                          <div>
                            <p>{payment.date}</p>
                            <p className="text-xs text-neutral-600">{payment.time}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewPayment(payment)}
                              title="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Download receipt">
                              <Download className="w-4 h-4" />
                            </Button>
                            {payment.status === "Failed" && (
                              <Button variant="ghost" size="sm" title="Retry payment">
                                <RefreshCw className="w-4 h-4" />
                              </Button>
                            )}
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
      {isViewModalOpen && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <Card className="w-full max-w-2xl my-8">
            <CardHeader className="border-b border-neutral-200">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">Payment Details</CardTitle>
                  <p className="text-sm text-neutral-600 mt-1">Complete transaction information</p>
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
              <div className={`mb-6 p-4 rounded-lg ${getStatusColor(selectedPayment.status)}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase opacity-80">Payment Status</p>
                    <p className="text-lg font-bold">{selectedPayment.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold uppercase opacity-80">Transaction ID</p>
                    <p className="text-lg font-bold font-mono">{selectedPayment.transactionId}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-neutral-900 border-b pb-2">Transaction Information</h3>
                  <div>
                    <p className="text-sm text-neutral-600">Customer</p>
                    <p className="font-medium text-neutral-900">{selectedPayment.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Booking ID</p>
                    <p className="font-medium text-neutral-900">{selectedPayment.bookingId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Payment Method</p>
                    <p className="font-medium text-neutral-900">{selectedPayment.paymentMethod}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-neutral-900 border-b pb-2">Payment Details</h3>
                  <div>
                    <p className="text-sm text-neutral-600">Amount</p>
                    <p className="font-bold text-primary text-xl">{selectedPayment.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Date</p>
                    <p className="font-medium text-neutral-900">{selectedPayment.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Time</p>
                    <p className="font-medium text-neutral-900">{selectedPayment.time}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setIsViewModalOpen(false)}>
                  Close
                </Button>
                <Button variant="outline" className="flex-1">
                  Download Receipt
                </Button>
                {selectedPayment.status === "Paid" && (
                  <Button variant="outline" className="flex-1 bg-error/10 text-error hover:bg-error/20">
                    Issue Refund
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
