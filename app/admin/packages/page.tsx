"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Trash2, Eye } from "lucide-react"
import AdminSidebar from "@/components/admin-sidebar"

interface Package {
  id: number
  name: string
  destination: string
  price: string
  status: string
  bookings: number
}

const initialPackages: Package[] = [
  { id: 1, name: "Boracay Beach Resort", destination: "Boracay", price: "$1,200", status: "Active", bookings: 45 },
  { id: 2, name: "Palawan Island Hopping", destination: "Palawan", price: "$1,800", status: "Active", bookings: 32 },
  { id: 3, name: "Cebu City Tour", destination: "Cebu", price: "$900", status: "Active", bookings: 28 },
  { id: 4, name: "Siargao Surfing", destination: "Siargao", price: "$1,100", status: "Inactive", bookings: 15 },
  { id: 5, name: "Baguio Mountain Retreat", destination: "Baguio", price: "$800", status: "Active", bookings: 22 },
]

export default function PackagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [packages, setPackages] = useState(initialPackages)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    price: "",
    status: "Active",
  })

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddPackage = () => {
    setFormData({ name: "", destination: "", price: "", status: "Active" })
    setIsAddModalOpen(true)
  }

  const handleEditPackage = (pkg: Package) => {
    setSelectedPackage(pkg)
    setFormData({
      name: pkg.name,
      destination: pkg.destination,
      price: pkg.price,
      status: pkg.status,
    })
    setIsEditModalOpen(true)
  }

  const handleViewPackage = (pkg: Package) => {
    setSelectedPackage(pkg)
    setIsViewModalOpen(true)
  }

  const handleSaveAdd = () => {
    const newPackage: Package = {
      id: Math.max(...packages.map((p) => p.id)) + 1,
      name: formData.name,
      destination: formData.destination,
      price: formData.price,
      status: formData.status,
      bookings: 0,
    }
    setPackages([...packages, newPackage])
    setIsAddModalOpen(false)
  }

  const handleSaveEdit = () => {
    if (selectedPackage) {
      setPackages(
        packages.map((p) =>
          p.id === selectedPackage.id
            ? {
                ...p,
                name: formData.name,
                destination: formData.destination,
                price: formData.price,
                status: formData.status,
              }
            : p,
        ),
      )
      setIsEditModalOpen(false)
    }
  }

  const handleDeletePackage = (id: number) => {
    if (confirm("Are you sure you want to delete this package?")) {
      setPackages(packages.filter((p) => p.id !== id))
    }
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
              <h1 className="text-2xl font-bold text-neutral-900">Package Management</h1>
              <p className="text-sm text-neutral-600">Manage travel packages and inventory</p>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 overflow-auto">
        {/* Search and Add Button */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button className="bg-primary hover:bg-primary/90" onClick={handleAddPackage}>
            <Plus className="w-4 h-4 mr-2" />
            Add Package
          </Button>
        </div>

        {/* Packages Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Packages</CardTitle>
            <CardDescription>Total: {filteredPackages.length} packages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">Package Name</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">Destination</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">Price</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">Bookings</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPackages.map((pkg) => (
                    <tr key={pkg.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-3 px-4 font-medium">{pkg.name}</td>
                      <td className="py-3 px-4">{pkg.destination}</td>
                      <td className="py-3 px-4 font-medium text-primary">{pkg.price}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${pkg.status === "Active" ? "bg-success/10 text-success" : "bg-neutral-100 text-neutral-600"}`}
                        >
                          {pkg.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{pkg.bookings}</td>
                      <td className="py-3 px-4 flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewPackage(pkg)} title="View package">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditPackage(pkg)} title="Edit package">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePackage(pkg.id)}
                          title="Delete package"
                        >
                          <Trash2 className="w-4 h-4 text-error" />
                        </Button>
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

      {/* Add Package Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add New Package</CardTitle>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700"
              >
                ✕
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Package Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter package name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Destination</label>
                <Input
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  placeholder="Enter destination"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Price</label>
                <Input
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Enter price"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setIsAddModalOpen(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSaveAdd} className="flex-1 bg-primary hover:bg-primary/90">
                  Add Package
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Package Modal */}
      {isEditModalOpen && selectedPackage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit Package</CardTitle>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700"
              >
                ✕
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Package Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter package name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Destination</label>
                <Input
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  placeholder="Enter destination"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Price</label>
                <Input
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Enter price"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setIsEditModalOpen(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit} className="flex-1 bg-primary hover:bg-primary/90">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* View Package Modal */}
      {isViewModalOpen && selectedPackage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Package Details</CardTitle>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700"
              >
                ✕
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-neutral-600">Package Name</p>
                <p className="font-medium text-neutral-900">{selectedPackage.name}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600">Destination</p>
                <p className="font-medium text-neutral-900">{selectedPackage.destination}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600">Price</p>
                <p className="font-medium text-neutral-900">{selectedPackage.price}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600">Status</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${selectedPackage.status === "Active" ? "bg-success/10 text-success" : "bg-neutral-100 text-neutral-600"}`}
                >
                  {selectedPackage.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-neutral-600">Total Bookings</p>
                <p className="font-medium text-neutral-900">{selectedPackage.bookings}</p>
              </div>
              <Button onClick={() => setIsViewModalOpen(false)} className="w-full">
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
