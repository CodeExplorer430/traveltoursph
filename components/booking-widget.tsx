"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Package {
  id: number
  name: string
  price: number
  duration: string
}

interface BookingWidgetProps {
  package: Package
}

export default function BookingWidget({ package: pkg }: BookingWidgetProps) {
  const [checkIn, setCheckIn] = useState("")
  const [travelers, setTravelers] = useState("2")
  const totalPrice = Number.parseInt(travelers) * pkg.price

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-24 h-fit">
      {/* Price */}
      <div className="mb-6">
        <p className="text-muted-foreground text-sm mb-1">Price per person</p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-primary">₱{pkg.price.toLocaleString()}</span>
          <span className="text-muted-foreground">/ person</span>
        </div>
      </div>

      {/* Booking Form */}
      <div className="space-y-4 mb-6 pb-6 border-b border-border">
        {/* Check-in Date */}
        <div>
          <label className="text-sm font-semibold text-foreground block mb-2">Check-in Date</label>
          <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <Input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="border-0 p-0 focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Travelers */}
        <div>
          <label className="text-sm font-semibold text-foreground block mb-2">Number of Travelers</label>
          <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <select
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              className="border-0 p-0 focus-visible:ring-0 bg-transparent w-full"
            >
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4">4 People</option>
              <option value="5">5+ People</option>
            </select>
          </div>
        </div>
      </div>

      {/* Total Price */}
      <div className="mb-6 pb-6 border-b border-border">
        <div className="flex justify-between items-center mb-2">
          <span className="text-muted-foreground">Subtotal ({travelers} travelers)</span>
          <span className="font-semibold text-foreground">₱{totalPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Taxes & Fees</span>
          <span className="font-semibold text-foreground">₱{Math.round(totalPrice * 0.12).toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
          <span className="font-bold text-foreground">Total</span>
          <span className="text-2xl font-bold text-primary">₱{Math.round(totalPrice * 1.12).toLocaleString()}</span>
        </div>
      </div>

      {/* Booking Button */}
      <Button asChild className="w-full mb-3">
        <Link href={`/checkout?packageId=${pkg.id}&travelers=${travelers}&checkIn=${checkIn}`}>Book Now</Link>
      </Button>

      <Button variant="outline" className="w-full bg-transparent">
        Add to Wishlist
      </Button>

      {/* Info */}
      <div className="mt-6 pt-6 border-t border-border text-sm text-muted-foreground space-y-2">
        <p>✓ Free cancellation up to 7 days before</p>
        <p>✓ Secure payment with SSL encryption</p>
        <p>✓ 24/7 customer support</p>
      </div>
    </div>
  )
}
