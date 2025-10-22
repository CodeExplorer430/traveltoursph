"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, Edit2, Trash2, Plus, Hotel, Plane, Activity, Bus } from "lucide-react"
import AdminSidebar from "@/components/admin-sidebar"

interface InventoryItem {
  id: string
  name: string
  category: "Hotels" | "Flights" | "Activities" | "Transfers"
  location: string
  capacity: number
  available: number
  price: string
  status: "Available" | "Low Stock" | "Out of Stock"
  lastUpdated: string
}

const inventoryData: InventoryItem[] = [
  {
    id: "INV001",
    name: "Shangrila Boracay Resort & Spa",
    category: "Hotels",
    location: "Boracay, Philippines",
    capacity: 50,
    available: 23,
    price: "₱8,500",
    status: "Available",
    lastUpdated: "2025-03-15"
  },
  {
    id: "INV002",
    name: "Manila to Boracay Flight",
    category: "Flights",
    location: "Manila - Caticlan",
    capacity: 180,
    available: 45,
    price: "₱4,200",
    status: "Available",
    lastUpdated: "2025-03-15"
  },
  {
    id: "INV003",
    name: "Island Hopping Tour",
    category: "Activities",
    location: "Palawan, Philippines",
    capacity: 30,
    available: 8,
    price: "₱2,500",
    status: "Low Stock",
    lastUpdated: "2025-03-14"
  },
  {
    id: "INV004",
    name: "Airport to Hotel Transfer",
    category: "Transfers",
    location: "Cebu City",
    capacity: 20,
    available: 15,
    price: "₱800",
    status: "Available",
    lastUpdated: "2025-03-14"
  },
  {
    id: "INV005",
    name: "El Nido Resorts",
    category: "Hotels",
    location: "Palawan, Philippines",
    capacity: 40,
    available: 0,
    price: "₱12,000",
    status: "Out of Stock",
    lastUpdated: "2025-03-13"
  },
  {
    id: "INV006",
    name: "Scuba Diving Experience",
    category: "Activities",
    location: "Siargao, Philippines",
    capacity: 25,
    available: 18,
    price: "₱3,500",
    status: "Available",
    lastUpdated: "2025-03-15"
  },
  {
    id: "INV007",
    name: "Manila to Cebu Flight",
    category: "Flights",
    location: "Manila - Cebu",
    capacity: 200,
    available: 5,
    price: "₱3,800",
    status: "Low Stock",
    lastUpdated: "2025-03-15"
  },
  {
    id: "INV008",
    name: "Private Van Rental",
    category: "Transfers",
    location: "Nationwide",
    capacity: 15,
    available: 12,
    price: "₱4,500",
    status: "Available",
    lastUpdated: "2025-03-14"
  }
]

export default function InventoryPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-success/10 text-success"
      case "Low Stock":
        return "bg-warning/10 text-warning"
      case "Out of Stock":
        return "bg-error/10 text-error"
      default:
        return "bg-neutral-100 text-neutral-600"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Hotels":
        return <Hotel className="w-4 h-4" />
      case "Flights":
        return <Plane className="w-4 h-4" />
      case "Activities":
        return <Activity className="w-4 h-4" />
      case "Transfers":
        return <Bus className="w-4 h-4" />
      default:
        return <Hotel className="w-4 h-4" />
    }
  }

  const filteredInventory = inventoryData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const handleViewItem = (item: InventoryItem) => {
    setSelectedItem(item)
    setIsViewModalOpen(true)
  }

  const totalItems = inventoryData.length
  const lowStockItems = inventoryData.filter(i => i.status === "Low Stock").length
  const outOfStockItems = inventoryData.filter(i => i.status === "Out of Stock").length
  const availableItems = inventoryData.filter(i => i.status === "Available").length

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <AdminSidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Inventory Management</h1>
              <p className="text-sm text-neutral-600">Manage hotels, flights, activities, and transfers</p>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Total Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neutral-900">{totalItems}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Available</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">{availableItems}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Low Stock</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">{lowStockItems}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Out of Stock</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-error">{outOfStockItems}</div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search by name, ID, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <div className="flex gap-2">
              <Button
                variant={categoryFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter("all")}
              >
                All
              </Button>
              <Button
                variant={categoryFilter === "Hotels" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter("Hotels")}
              >
                <Hotel className="w-4 h-4 mr-1" />
                Hotels
              </Button>
              <Button
                variant={categoryFilter === "Flights" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter("Flights")}
              >
                <Plane className="w-4 h-4 mr-1" />
                Flights
              </Button>
              <Button
                variant={categoryFilter === "Activities" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter("Activities")}
              >
                <Activity className="w-4 h-4 mr-1" />
                Activities
              </Button>
              <Button
                variant={categoryFilter === "Transfers" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter("Transfers")}
              >
                <Bus className="w-4 h-4 mr-1" />
                Transfers
              </Button>
            </div>
            <Button variant="default">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>

          {/* Inventory Table */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory Items</CardTitle>
              <CardDescription>Showing {filteredInventory.length} items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Item ID</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Location</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Capacity</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Available</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Price</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map((item) => (
                      <tr key={item.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-3 px-4 font-medium text-primary">{item.id}</td>
                        <td className="py-3 px-4 font-medium">{item.name}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(item.category)}
                            <span>{item.category}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-neutral-600">{item.location}</td>
                        <td className="py-3 px-4">{item.capacity}</td>
                        <td className="py-3 px-4">
                          <span className={`font-medium ${item.available === 0 ? 'text-error' : item.available < 10 ? 'text-warning' : 'text-success'}`}>
                            {item.available}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium">{item.price}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewItem(item)}
                              title="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Edit item">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Delete item">
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
      {isViewModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <Card className="w-full max-w-2xl my-8">
            <CardHeader className="border-b border-neutral-200">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">Inventory Item Details</CardTitle>
                  <p className="text-sm text-neutral-600 mt-1">{selectedItem.name}</p>
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
              <div className={`mb-6 p-4 rounded-lg ${getStatusColor(selectedItem.status)}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase opacity-80">Status</p>
                    <p className="text-lg font-bold">{selectedItem.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold uppercase opacity-80">Item ID</p>
                    <p className="text-lg font-bold font-mono">{selectedItem.id}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-neutral-900 border-b pb-2">Item Information</h3>
                  <div>
                    <p className="text-sm text-neutral-600">Item Name</p>
                    <p className="font-medium text-neutral-900">{selectedItem.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Category</p>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(selectedItem.category)}
                      <p className="font-medium text-neutral-900">{selectedItem.category}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Location</p>
                    <p className="font-medium text-neutral-900">{selectedItem.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Last Updated</p>
                    <p className="font-medium text-neutral-900">{selectedItem.lastUpdated}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-neutral-900 border-b pb-2">Availability & Pricing</h3>
                  <div>
                    <p className="text-sm text-neutral-600">Total Capacity</p>
                    <p className="font-medium text-neutral-900">{selectedItem.capacity} Units</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Available</p>
                    <p className={`font-bold text-xl ${selectedItem.available === 0 ? 'text-error' : selectedItem.available < 10 ? 'text-warning' : 'text-success'}`}>
                      {selectedItem.available} Units
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Price per Unit</p>
                    <p className="font-bold text-primary text-xl">{selectedItem.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Occupancy Rate</p>
                    <p className="font-medium text-neutral-900">
                      {((selectedItem.capacity - selectedItem.available) / selectedItem.capacity * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setIsViewModalOpen(false)}>
                  Close
                </Button>
                <Button variant="outline" className="flex-1">
                  Update Stock
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  Edit Item
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
