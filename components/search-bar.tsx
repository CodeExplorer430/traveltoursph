"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SearchBar() {
  const router = useRouter()
  const [destination, setDestination] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [travelers, setTravelers] = useState("2")

  const handleSearch = () => {
    const params = new URLSearchParams({
      destination: destination || "",
      checkIn: checkIn || "",
      checkOut: checkOut || "",
      travelers: travelers || "2",
    })
    router.push(`/search?${params.toString()}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 -mt-8 relative z-10 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        {/* Destination */}
        <div className="flex flex-col gap-2">
          <label htmlFor="destination" className="text-sm font-semibold text-foreground">Destination</label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <Input
              id="destination"
              type="text"
              placeholder="Where to?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 h-11 text-foreground"
            />
          </div>
        </div>

        {/* Check-in Date */}
        <div className="flex flex-col gap-2">
          <label htmlFor="checkIn" className="text-sm font-semibold text-foreground">Check-in</label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
            <Input
              id="checkIn"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 h-11 cursor-pointer"
            />
          </div>
        </div>

        {/* Check-out Date */}
        <div className="flex flex-col gap-2">
          <label htmlFor="checkOut" className="text-sm font-semibold text-foreground">Check-out</label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
            <Input
              id="checkOut"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 h-11 cursor-pointer"
            />
          </div>
        </div>

        {/* Travelers */}
        <div className="flex flex-col gap-2">
          <label htmlFor="travelers" className="text-sm font-semibold text-foreground">Travelers</label>
          <div className="relative">
            <Users className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
            <select
              id="travelers"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              className="w-full h-11 pl-10 pr-3 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
            >
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4">4 People</option>
              <option value="5">5+ People</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <Button onClick={handleSearch} className="w-full gap-2 h-11">
          <Search className="w-4 h-4" />
          Search
        </Button>
      </div>
    </div>
  )
}
