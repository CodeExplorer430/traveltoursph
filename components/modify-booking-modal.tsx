"use client"

import { useState } from "react"
import { X, Calendar, Users, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Booking {
  id: number
  confirmationNumber: string
  packageName: string
  destination: string
  checkIn: string
  checkOut: string
  travelers: number
  totalPrice: number
  status: "confirmed" | "pending" | "completed"
  image: string
}

interface ModifyBookingModalProps {
  booking: Booking
  onClose: () => void
  onSave: (updatedBooking: Booking) => void
}

export default function ModifyBookingModal({ booking, onClose, onSave }: ModifyBookingModalProps) {
  const [checkIn, setCheckIn] = useState(booking.checkIn)
  const [checkOut, setCheckOut] = useState(booking.checkOut)
  const [travelers, setTravelers] = useState(booking.travelers.toString())

  const handleSave = () => {
    const updatedBooking = {
      ...booking,
      checkIn,
      checkOut,
      travelers: parseInt(travelers),
    }
    onSave(updatedBooking)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-lg shadow-2xl max-w-2xl w-full">
        {/* Header */}
        <div className="bg-card border-b border-border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Modify Booking</h2>
            <p className="text-sm text-muted-foreground">Update your travel dates and details</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">{booking.packageName}</h3>
            <p className="text-sm text-muted-foreground">Confirmation: {booking.confirmationNumber}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="checkIn" className="block text-sm font-semibold text-foreground mb-2">
                Check-in Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                <Input
                  id="checkIn"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="checkOut" className="block text-sm font-semibold text-foreground mb-2">
                Check-out Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                <Input
                  id="checkOut"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="travelers" className="block text-sm font-semibold text-foreground mb-2">
                Number of Travelers
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                <select
                  id="travelers"
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5">5 People</option>
                  <option value="6">6 People</option>
                  <option value="7">7 People</option>
                  <option value="8">8+ People</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Please note: Modifications to your booking may affect the total price. You will receive a confirmation email with updated details.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-card border-t border-border p-6 flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1 gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
