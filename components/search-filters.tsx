"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [rating, setRating] = useState(0)
  const [duration, setDuration] = useState("")
  const [packageType, setPackageType] = useState<string[]>([])
  const [activities, setActivities] = useState<string[]>([])

  const handleFilterChange = () => {
    const params = new URLSearchParams(searchParams)
    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())
    if (rating > 0) params.set("rating", rating.toString())
    if (duration) params.set("duration", duration)
    if (packageType.length > 0) params.set("type", packageType.join(","))
    if (activities.length > 0) params.set("activities", activities.join(","))
    router.push(`/search?${params.toString()}`)
  }

  const handleReset = () => {
    setPriceRange([0, 50000])
    setRating(0)
    setDuration("")
    setPackageType([])
    setActivities([])
    const params = new URLSearchParams(searchParams)
    const destination = params.get("destination")
    if (destination) {
      router.push(`/search?destination=${destination}`)
    } else {
      router.push("/search")
    }
  }

  const togglePackageType = (type: string) => {
    setPackageType((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const toggleActivity = (activity: string) => {
    setActivities((prev) => (prev.includes(activity) ? prev.filter((a) => a !== activity) : [...prev, activity]))
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-lg text-foreground">Filters</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4 mr-1" />
          Clear
        </Button>
      </div>

      {/* Price Range */}
      <div className="mb-6 pb-6 border-b border-border">
        <h4 className="font-semibold text-sm mb-3 text-foreground">Price Range (per person)</h4>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Min</span>
            <span className="font-medium text-foreground">₱{priceRange[0].toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="0"
            max="50000"
            step="1000"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Max</span>
            <span className="font-medium text-foreground">₱{priceRange[1].toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="0"
            max="50000"
            step="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
            className="w-full accent-primary"
          />
        </div>
      </div>

      {/* Package Type */}
      <div className="mb-6 pb-6 border-b border-border">
        <h4 className="font-semibold text-sm mb-3 text-foreground">Package Type</h4>
        <div className="space-y-2">
          {["Beach", "Adventure", "City Tour", "Cultural", "Eco-Tourism"].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={packageType.includes(type)}
                onChange={() => togglePackageType(type)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6 pb-6 border-b border-border">
        <h4 className="font-semibold text-sm mb-3 text-foreground">Minimum Rating</h4>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map((r) => (
            <label key={r} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                value={r}
                checked={rating === r}
                onChange={(e) => setRating(Number.parseFloat(e.target.value))}
                className="w-4 h-4 text-primary focus:ring-primary"
              />
              <div className="flex items-center gap-1">
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">{r}+</span>
                <span className="text-yellow-500">★</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="mb-6 pb-6 border-b border-border">
        <h4 className="font-semibold text-sm mb-3 text-foreground">Duration</h4>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
        >
          <option value="">All Durations</option>
          <option value="1">1 Day</option>
          <option value="2">2 Days</option>
          <option value="3">3 Days</option>
          <option value="4">4 Days</option>
          <option value="5">5+ Days</option>
        </select>
      </div>

      {/* Activities */}
      <div className="mb-6 pb-6 border-b border-border">
        <h4 className="font-semibold text-sm mb-3 text-foreground">Activities Included</h4>
        <div className="space-y-2">
          {["Snorkeling", "Diving", "Island Hopping", "Trekking", "Water Sports"].map((activity) => (
            <label key={activity} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={activities.includes(activity)}
                onChange={() => toggleActivity(activity)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">{activity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2">
        <Button onClick={handleFilterChange} className="w-full">
          Apply Filters
        </Button>
        <Button onClick={handleReset} variant="outline" className="w-full bg-transparent">
          Reset
        </Button>
      </div>
    </div>
  )
}
