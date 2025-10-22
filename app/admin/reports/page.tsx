"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Download, TrendingUp, Calendar } from "lucide-react"
import AdminSidebar from "@/components/admin-sidebar"

interface Report {
  id: string
  name: string
  type: "Sales" | "Bookings" | "Revenue" | "Customer Activity"
  generatedBy: string
  dateRange: string
  generatedDate: string
  fileSize: string
  status: "Completed" | "Processing" | "Failed"
}

const reportsData: Report[] = [
  {
    id: "RPT001",
    name: "Monthly Sales Report - February 2025",
    type: "Sales",
    generatedBy: "Admin User",
    dateRange: "Feb 1 - Feb 28, 2025",
    generatedDate: "2025-03-01",
    fileSize: "2.3 MB",
    status: "Completed"
  },
  {
    id: "RPT002",
    name: "Q1 2025 Bookings Analysis",
    type: "Bookings",
    generatedBy: "Admin User",
    dateRange: "Jan 1 - Mar 31, 2025",
    generatedDate: "2025-03-15",
    fileSize: "4.1 MB",
    status: "Completed"
  },
  {
    id: "RPT003",
    name: "Revenue Report - January 2025",
    type: "Revenue",
    generatedBy: "Finance Manager",
    dateRange: "Jan 1 - Jan 31, 2025",
    generatedDate: "2025-02-05",
    fileSize: "1.8 MB",
    status: "Completed"
  },
  {
    id: "RPT004",
    name: "Customer Activity - Last 90 Days",
    type: "Customer Activity",
    generatedBy: "Marketing Team",
    dateRange: "Dec 1, 2024 - Feb 28, 2025",
    generatedDate: "2025-03-01",
    fileSize: "3.5 MB",
    status: "Completed"
  },
  {
    id: "RPT005",
    name: "Weekly Sales Summary",
    type: "Sales",
    generatedBy: "Admin User",
    dateRange: "Mar 10 - Mar 16, 2025",
    generatedDate: "2025-03-17",
    fileSize: "0.8 MB",
    status: "Processing"
  }
]

export default function ReportsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedReportType, setSelectedReportType] = useState("Sales")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-success/10 text-success"
      case "Processing":
        return "bg-warning/10 text-warning"
      case "Failed":
        return "bg-error/10 text-error"
      default:
        return "bg-neutral-100 text-neutral-600"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Sales":
        return "text-primary"
      case "Bookings":
        return "text-success"
      case "Revenue":
        return "text-warning"
      case "Customer Activity":
        return "text-error"
      default:
        return "text-neutral-600"
    }
  }

  const filteredReports = reportsData.filter((report) => {
    const matchesSearch =
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  const handleGenerateReport = () => {
    alert(`Generating ${selectedReportType} report from ${startDate || 'start'} to ${endDate || 'end'}`)
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <AdminSidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Reports Management</h1>
              <p className="text-sm text-neutral-600">Generate and view business reports</p>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Total Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neutral-900">{reportsData.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">12</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">
                  {reportsData.filter(r => r.status === "Processing").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">
                  {reportsData.filter(r => r.status === "Completed").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Generate Report Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Generate New Report</CardTitle>
              <CardDescription>Create custom reports for your business analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Report Type</label>
                  <select
                    value={selectedReportType}
                    onChange={(e) => setSelectedReportType(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Sales">Sales Report</option>
                    <option value="Bookings">Bookings Report</option>
                    <option value="Revenue">Revenue Report</option>
                    <option value="Customer Activity">Customer Activity</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Start Date</label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">End Date</label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Action</label>
                  <Button onClick={handleGenerateReport} className="w-full">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export as PDF
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export as Excel
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export as CSV
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search reports by name, type, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>

          {/* Reports Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Showing {filteredReports.length} reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Report ID</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Report Name</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Date Range</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Generated Date</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">File Size</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map((report) => (
                      <tr key={report.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-3 px-4 font-medium text-primary">{report.id}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-neutral-600" />
                            <span className="font-medium">{report.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-medium ${getTypeColor(report.type)}`}>
                            {report.type}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1 text-xs text-neutral-600">
                            <Calendar className="w-3 h-3" />
                            {report.dateRange}
                          </div>
                        </td>
                        <td className="py-3 px-4">{report.generatedDate}</td>
                        <td className="py-3 px-4 text-neutral-600">{report.fileSize}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            {report.status === "Completed" && (
                              <>
                                <Button variant="ghost" size="sm" title="Download report">
                                  <Download className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" title="View report">
                                  <FileText className="w-4 h-4" />
                                </Button>
                              </>
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
    </div>
  )
}
