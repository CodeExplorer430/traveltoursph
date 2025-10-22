"use client"

import { useState } from "react"
import { LogOut, Calendar, Heart, MapPin, TrendingUp, Search, Star, Award, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import DashboardHeader from "@/components/dashboard-header"
import BookingsList from "@/components/bookings-list"
import WishlistItems from "@/components/wishlist-items"
import ProfileSettings from "@/components/profile-settings"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("bookings")
  const [user, setUser] = useState({
    name: "Maria Santos",
    email: "maria@example.com",
    phone: "+63 9XX XXX XXXX",
    nationality: "Philippine",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
  })

  // Mock bookings data
  const bookings = [
    {
      id: 1,
      confirmationNumber: "TRV123ABC456",
      packageName: "Boracay Beach Paradise",
      destination: "Boracay Island",
      checkIn: "2025-02-15",
      checkOut: "2025-02-18",
      travelers: 2,
      totalPrice: 25998,
      status: "confirmed",
      image: "https://www.vacationstravel.com/wp-content/uploads/2018/02/105_boracay_shutterstock_559004854.jpg",
    },
    {
      id: 2,
      confirmationNumber: "TRV789DEF012",
      packageName: "Palawan Island Adventure",
      destination: "Palawan",
      checkIn: "2025-03-10",
      checkOut: "2025-03-14",
      travelers: 3,
      totalPrice: 47997,
      status: "pending",
      image: "https://cdn.tourradar.com/s3/review/1500x800/357813_65fed347adfb9.jpg",
    },
    {
      id: 3,
      confirmationNumber: "TRV345GHI678",
      packageName: "Cebu City Explorer",
      destination: "Cebu",
      checkIn: "2024-12-20",
      checkOut: "2024-12-22",
      travelers: 2,
      totalPrice: 19998,
      status: "completed",
      image: "https://blog.worldpinoyflights.com/wp-content/uploads/2025/07/Cebu-CityThings-to-do-in-Cebu-City-World-Pinoy-Flights-Blog.jpg",
    },
  ]

  // Mock wishlist data
  const wishlist = [
    {
      id: 1,
      name: "Siargao Surfing Retreat",
      destination: "Siargao Island",
      price: 11999,
      rating: 4.7,
      reviews: 198,
      image: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?w=800&h=600&fit=crop",
      duration: "3 Days",
    },
    {
      id: 2,
      name: "Banaue Rice Terraces Trek",
      destination: "Banaue",
      price: 8999,
      rating: 4.7,
      reviews: 156,
      image: "https://www.ottsworld.com/wp-content/uploads/2020/03/Batad-Rice-Terraces-3579.jpg",
      duration: "2 Days",
    },
    {
      id: 3,
      name: "Coron Island Hopping",
      destination: "Coron",
      price: 13999,
      rating: 4.8,
      reviews: 289,
      image: "https://gttp.images.tshiftcdn.com/196375/x/0/a-boat-glides-across-the-crystal-clear-waters-of-kayangan-lake-during-this-cruise-friendly-private-coron-island-hopping-tour-a.jpg?height=1200&bg-color=%23000&quality=75&dpr=1",
      duration: "3 Days",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <DashboardHeader user={user} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-center mb-6">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  className="w-16 h-16 rounded-full mx-auto mb-3"
                />
                <h3 className="font-bold text-lg text-foreground">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>

              <div className="space-y-2 mb-6 pb-6 border-b border-border">
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "bookings" ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
                  }`}
                >
                  My Bookings
                </button>
                <button
                  onClick={() => setActiveTab("wishlist")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "wishlist" ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
                  }`}
                >
                  Wishlist
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "settings" ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
                  }`}
                >
                  Settings
                </button>
              </div>

              <Button variant="outline" className="w-full bg-transparent gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                <Link href="/search" className="block">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Search className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Browse Packages</p>
                      <p className="text-xs opacity-90">Find new adventures</p>
                    </div>
                  </div>
                </Link>
              </Card>
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-accent to-accent/80 text-accent-foreground">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">My Reviews</p>
                    <p className="text-xs opacity-90">Share experiences</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-green-500 to-green-600 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Rewards</p>
                    <p className="text-xs opacity-90">Earn points</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Recent Activity</p>
                    <p className="text-xs opacity-90">View history</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Stats Cards */}
            {activeTab === "bookings" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
                      <p className="text-2xl font-bold text-foreground">{bookings.length}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Destinations Visited</p>
                      <p className="text-2xl font-bold text-foreground">
                        {new Set(bookings.map((b) => b.destination)).size}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
                      <p className="text-2xl font-bold text-foreground">
                        ₱{bookings.reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="mb-8">
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Saved Packages</p>
                      <p className="text-2xl font-bold text-foreground">{wishlist.length}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-red-500" />
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Tab Content */}
            {activeTab === "bookings" && <BookingsList bookings={bookings} />}
            {activeTab === "wishlist" && <WishlistItems items={wishlist} />}
            {activeTab === "settings" && <ProfileSettings user={user} setUser={setUser} />}
          </div>
        </div>
      </div>
    </div>
  )
}
