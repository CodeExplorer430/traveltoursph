"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, MessageSquare, Eye, Edit2, Send, Bell } from "lucide-react"
import AdminSidebar from "@/components/admin-sidebar"

interface Template {
  id: string
  name: string
  type: "Booking Confirmation" | "Payment Receipt" | "Reminder" | "Cancellation" | "Welcome" | "Promotion"
  channel: "Email" | "SMS" | "Both"
  subject: string
  lastModified: string
  status: "Active" | "Draft" | "Archived"
}

interface Notification {
  id: string
  recipient: string
  template: string
  channel: "Email" | "SMS"
  sentDate: string
  sentTime: string
  status: "Sent" | "Failed" | "Pending"
}

const templatesData: Template[] = [
  {
    id: "TMP001",
    name: "Booking Confirmation Email",
    type: "Booking Confirmation",
    channel: "Email",
    subject: "Your Booking is Confirmed - {{bookingId}}",
    lastModified: "2025-02-15",
    status: "Active"
  },
  {
    id: "TMP002",
    name: "Payment Receipt Email",
    type: "Payment Receipt",
    channel: "Email",
    subject: "Payment Receipt - {{transactionId}}",
    lastModified: "2025-02-10",
    status: "Active"
  },
  {
    id: "TMP003",
    name: "Booking Reminder SMS",
    type: "Reminder",
    channel: "SMS",
    subject: "Your trip is coming up! {{packageName}} on {{date}}",
    lastModified: "2025-01-28",
    status: "Active"
  },
  {
    id: "TMP004",
    name: "Cancellation Notice",
    type: "Cancellation",
    channel: "Both",
    subject: "Booking Cancellation - {{bookingId}}",
    lastModified: "2025-02-05",
    status: "Active"
  },
  {
    id: "TMP005",
    name: "Welcome Email",
    type: "Welcome",
    channel: "Email",
    subject: "Welcome to TravelTours - Start Your Journey!",
    lastModified: "2024-12-20",
    status: "Active"
  },
  {
    id: "TMP006",
    name: "Special Promotion",
    type: "Promotion",
    channel: "Both",
    subject: "Exclusive Deal: {{discount}}% Off Your Next Trip!",
    lastModified: "2025-03-01",
    status: "Draft"
  }
]

const notificationsData: Notification[] = [
  {
    id: "NOT001",
    recipient: "john.doe@example.com",
    template: "Booking Confirmation Email",
    channel: "Email",
    sentDate: "2025-03-15",
    sentTime: "14:23:45",
    status: "Sent"
  },
  {
    id: "NOT002",
    recipient: "+63 923 456 7890",
    template: "Booking Reminder SMS",
    channel: "SMS",
    sentDate: "2025-03-15",
    sentTime: "09:15:22",
    status: "Sent"
  },
  {
    id: "NOT003",
    recipient: "mike.j@example.com",
    template: "Payment Receipt Email",
    channel: "Email",
    sentDate: "2025-03-14",
    sentTime: "16:45:12",
    status: "Sent"
  },
  {
    id: "NOT004",
    recipient: "sarah.w@example.com",
    template: "Welcome Email",
    channel: "Email",
    sentDate: "2025-03-14",
    sentTime: "11:30:05",
    status: "Failed"
  },
  {
    id: "NOT005",
    recipient: "tom.brown@example.com",
    template: "Cancellation Notice",
    channel: "Email",
    sentDate: "2025-03-13",
    sentTime: "13:20:33",
    status: "Sent"
  }
]

export default function NotificationsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
      case "Sent":
        return "bg-success/10 text-success"
      case "Draft":
      case "Pending":
        return "bg-warning/10 text-warning"
      case "Archived":
      case "Failed":
        return "bg-error/10 text-error"
      default:
        return "bg-neutral-100 text-neutral-600"
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "Email":
        return <Mail className="w-4 h-4" />
      case "SMS":
        return <MessageSquare className="w-4 h-4" />
      case "Both":
        return <Bell className="w-4 h-4" />
      default:
        return <Mail className="w-4 h-4" />
    }
  }

  const filteredTemplates = templatesData.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.id.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  const handleViewTemplate = (template: Template) => {
    setSelectedTemplate(template)
    setIsViewModalOpen(true)
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <AdminSidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Notifications Management</h1>
              <p className="text-sm text-neutral-600">Manage email and SMS notification templates</p>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Total Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neutral-900">{templatesData.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Active Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">
                  {templatesData.filter(t => t.status === "Active").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Sent Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">247</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Failed Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-error">
                  {notificationsData.filter(n => n.status === "Failed").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search templates by name, type, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button variant="default">
              <Send className="w-4 h-4 mr-2" />
              Create New Template
            </Button>
          </div>

          {/* Templates Table */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Email & SMS Templates</CardTitle>
              <CardDescription>Showing {filteredTemplates.length} templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Template ID</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Channel</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Subject</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Last Modified</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTemplates.map((template) => (
                      <tr key={template.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-3 px-4 font-medium text-primary">{template.id}</td>
                        <td className="py-3 px-4 font-medium">{template.name}</td>
                        <td className="py-3 px-4">{template.type}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            {getChannelIcon(template.channel)}
                            <span>{template.channel}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-neutral-600 max-w-xs truncate">{template.subject}</td>
                        <td className="py-3 px-4">{template.lastModified}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(template.status)}`}>
                            {template.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewTemplate(template)}
                              title="View template"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Edit template">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Send notification">
                              <Send className="w-4 h-4 text-primary" />
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

          {/* Recent Notifications History */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Recently sent notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Notification ID</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Recipient</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Template</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Channel</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Sent Date</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notificationsData.map((notification) => (
                      <tr key={notification.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-3 px-4 font-medium text-primary">{notification.id}</td>
                        <td className="py-3 px-4">{notification.recipient}</td>
                        <td className="py-3 px-4">{notification.template}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            {getChannelIcon(notification.channel)}
                            <span>{notification.channel}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p>{notification.sentDate}</p>
                            <p className="text-xs text-neutral-600">{notification.sentTime}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(notification.status)}`}>
                            {notification.status}
                          </span>
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

      {/* View Template Modal */}
      {isViewModalOpen && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <Card className="w-full max-w-2xl my-8">
            <CardHeader className="border-b border-neutral-200">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">Template Details</CardTitle>
                  <p className="text-sm text-neutral-600 mt-1">{selectedTemplate.name}</p>
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
              <div className={`mb-6 p-4 rounded-lg ${getStatusColor(selectedTemplate.status)}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase opacity-80">Status</p>
                    <p className="text-lg font-bold">{selectedTemplate.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold uppercase opacity-80">Template ID</p>
                    <p className="text-lg font-bold font-mono">{selectedTemplate.id}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-neutral-600">Template Type</p>
                  <p className="font-medium text-neutral-900">{selectedTemplate.type}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Channel</p>
                  <div className="flex items-center gap-2">
                    {getChannelIcon(selectedTemplate.channel)}
                    <p className="font-medium text-neutral-900">{selectedTemplate.channel}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Subject Line</p>
                  <p className="font-medium text-neutral-900">{selectedTemplate.subject}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Last Modified</p>
                  <p className="font-medium text-neutral-900">{selectedTemplate.lastModified}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setIsViewModalOpen(false)}>
                  Close
                </Button>
                <Button variant="outline" className="flex-1">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Template
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  <Send className="w-4 h-4 mr-2" />
                  Send Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
