"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Star, MapPin, ArrowLeft, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import SearchFilters from "@/components/search-filters"

interface Package {
  id: number
  name: string
  destination: string
  price: number
  rating: number
  reviews: number
  image: string
  duration: string
}

// Mock data - in a real app, this would come from a database
const allPackages: Package[] = [
  {
    id: 1,
    name: "Boracay Beach Paradise",
    destination: "Boracay Island",
    price: 12999,
    rating: 4.8,
    reviews: 324,
    image: "https://gttp.images.tshiftcdn.com/455702/x/0/fun-5-day-boracay-tour-package-at-paradise-garden-resort-with-island-hopping-daily-breakfast.jpg?height=1200&bg-color=%23000&quality=75&dpr=1",
    duration: "3 Days",
  },
  {
    id: 2,
    name: "Palawan Island Adventure",
    destination: "Palawan",
    price: 15999,
    rating: 4.9,
    reviews: 512,
    image: "https://www.agoda.com/wp-content/uploads/2024/03/Coron-Palawan-2-1244x700.jpg",
    duration: "4 Days",
  },
  {
    id: 3,
    name: "Cebu City Explorer",
    destination: "Cebu",
    price: 9999,
    rating: 4.6,
    reviews: 287,
    image: "https://blog.worldpinoyflights.com/wp-content/uploads/2025/07/Mactan-IslandThings-to-do-in-Cebu-City-World-Pinoy-Flights-Blog-1024x580.jpg",
    duration: "2 Days",
  },
  {
    id: 4,
    name: "Siargao Surfing Retreat",
    destination: "Siargao Island",
    price: 11999,
    rating: 4.7,
    reviews: 198,
    image: "https://static.wixstatic.com/media/806657_9df858e1c3704284a3a18ff84cf476f8~mv2.jpg/v1/fill/w_962,h_742,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/806657_9df858e1c3704284a3a18ff84cf476f8~mv2.jpg",
    duration: "3 Days",
  },
  {
    id: 5,
    name: "Banaue Rice Terraces Trek",
    destination: "Banaue",
    price: 8999,
    rating: 4.7,
    reviews: 156,
    image: "https://www.ottsworld.com/wp-content/uploads/2020/03/Batad-Rice-Terraces-3449.jpg",
    duration: "2 Days",
  },
  {
    id: 6,
    name: "Coron Island Hopping",
    destination: "Coron",
    price: 13999,
    rating: 4.8,
    reviews: 289,
    image: "https://gttp.images.tshiftcdn.com/466116/x/0/.jpg?height=1200&bg-color=%23000&quality=75&dpr=1",
    duration: "3 Days",
  },
]

function SearchContent() {
  const searchParams = useSearchParams()
  const destination = searchParams.get("destination") || ""
  const checkIn = searchParams.get("checkIn") || ""
  const checkOut = searchParams.get("checkOut") || ""
  const travelers = searchParams.get("travelers") || "2"
  const minPrice = Number.parseInt(searchParams.get("minPrice") || "0")
  const maxPrice = Number.parseInt(searchParams.get("maxPrice") || "50000")
  const rating = Number.parseFloat(searchParams.get("rating") || "0")
  const [sortBy, setSortBy] = useState("popular")

  let filteredPackages = allPackages.filter((pkg) => {
    if (destination && !pkg.destination.toLowerCase().includes(destination.toLowerCase())) {
      return false
    }
    if (pkg.price < minPrice || pkg.price > maxPrice) {
      return false
    }
    if (rating > 0 && pkg.rating < rating) {
      return false
    }
    return true
  })

  // Sort packages
  if (sortBy === "price-low") {
    filteredPackages = [...filteredPackages].sort((a, b) => a.price - b.price)
  } else if (sortBy === "price-high") {
    filteredPackages = [...filteredPackages].sort((a, b) => b.price - a.price)
  } else if (sortBy === "rating") {
    filteredPackages = [...filteredPackages].sort((a, b) => b.rating - a.rating)
  } else if (sortBy === "duration") {
    filteredPackages = [...filteredPackages].sort((a, b) => {
      const durationA = Number.parseInt(a.duration)
      const durationB = Number.parseInt(b.duration)
      return durationA - durationB
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Search Results</h1>
          <p className="text-primary-foreground/90">
            {destination && `Showing results for "${destination}"`}
            {checkIn && ` • Check-in: ${checkIn}`}
            {checkOut && ` • Check-out: ${checkOut}`}
            {travelers && ` • ${travelers} traveler${travelers !== "1" ? "s" : ""}`}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {filteredPackages.length > 0 ? (
              <>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <p className="text-muted-foreground">
                    Found {filteredPackages.length} package{filteredPackages.length !== 1 ? "s" : ""}
                  </p>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none w-full sm:w-auto"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="duration">Duration</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPackages.map((pkg) => (
                    <Link key={pkg.id} href={`/packages/${pkg.id}`}>
                      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                        {/* Image */}
                        <div className="h-48 bg-gradient-to-br from-secondary to-secondary/60 overflow-hidden">
                          <img
                            src={pkg.image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"}
                            alt={pkg.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Content */}
                        <div className="p-4 flex flex-col flex-1">
                          <h3 className="font-bold text-lg text-foreground line-clamp-2 mb-2">{pkg.name}</h3>

                          <div className="flex items-center gap-1 mb-3 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{pkg.destination}</span>
                          </div>

                          <div className="flex items-center gap-1 mb-4">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.floor(pkg.rating) ? "fill-accent text-accent" : "text-muted-foreground"}`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {pkg.rating} ({pkg.reviews})
                            </span>
                          </div>

                          <div className="mt-auto">
                            <div className="flex justify-between items-center mb-3">
                              <div>
                                <p className="text-xs text-muted-foreground">{pkg.duration}</p>
                                <p className="text-primary font-bold text-lg">₱{pkg.price.toLocaleString()}</p>
                              </div>
                            </div>
                            <Button className="w-full" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">No packages found matching your criteria.</p>
                <Button asChild>
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}
