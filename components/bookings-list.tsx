"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Users, MapPin, MoreVertical, Download, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import BookingDetailsModal from "./booking-details-modal"
import ModifyBookingModal from "./modify-booking-modal"
import CancelBookingModal from "./cancel-booking-modal"
import SupportModal from "./support-modal"

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

interface BookingsListProps {
  bookings: Booking[]
}

export default function BookingsList({ bookings }: BookingsListProps) {
  const [filter, setFilter] = useState<"all" | "confirmed" | "pending" | "completed">("all")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showModifyModal, setShowModifyModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showSupportModal, setShowSupportModal] = useState(false)

  const filteredBookings = filter === "all" ? bookings : bookings.filter((b) => b.status === filter)

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking)
    setShowDetailsModal(true)
  }

  const handleModifyBooking = (booking: Booking) => {
    setSelectedBooking(booking)
    setShowModifyModal(true)
  }

  const handleCancelBooking = (booking: Booking) => {
    setSelectedBooking(booking)
    setShowCancelModal(true)
  }

  const handleSupport = (booking: Booking) => {
    setSelectedBooking(booking)
    setShowSupportModal(true)
  }

  const handleSaveModification = (updatedBooking: Booking) => {
    console.log("Booking modified:", updatedBooking)
    // In a real app, this would call an API to update the booking
    setShowModifyModal(false)
    setSelectedBooking(null)
    alert("Booking modification request submitted successfully!")
  }

  const handleConfirmCancellation = (bookingId: number, reason: string) => {
    console.log("Booking cancelled:", bookingId, "Reason:", reason)
    // In a real app, this would call an API to cancel the booking
    setShowCancelModal(false)
    setSelectedBooking(null)
    alert("Booking cancelled successfully. You will receive a confirmation email shortly.")
  }

  const handleSubmitSupport = (bookingId: number, subject: string, message: string) => {
    console.log("Support request:", { bookingId, subject, message })
    // In a real app, this would call an API to submit the support request
    setShowSupportModal(false)
    setSelectedBooking(null)
    alert("Support request submitted successfully! We'll get back to you within 24 hours.")
  }

  const handleDownload = (booking: Booking) => {
    // In a real app, this would generate and download a PDF
    alert(`Downloading booking confirmation for ${booking.confirmationNumber}...`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">My Bookings</h2>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          {(["all", "confirmed", "pending", "completed"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors capitalize ${
                filter === status ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {status === "all" ? "All Bookings" : status}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-48 h-48 md:h-auto bg-gradient-to-br from-secondary to-secondary/60 flex-shrink-0">
                  <img
                    src={booking.image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"}
                    alt={booking.packageName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-foreground">{booking.packageName}</h3>
                        <p className="text-sm text-muted-foreground">Confirmation: {booking.confirmationNumber}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(booking.status)}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{booking.destination}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{new Date(booking.checkIn).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{booking.travelers} travelers</span>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Total</p>
                        <p className="font-bold text-primary">₱{booking.totalPrice.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent gap-2"
                      onClick={() => handleDownload(booking)}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent gap-2"
                      onClick={() => handleSupport(booking)}
                    >
                      <MessageSquare className="w-4 h-4" />
                      Support
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(booking)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleModifyBooking(booking)}>
                          Modify Booking
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleCancelBooking(booking)}
                          className="text-destructive focus:text-destructive"
                        >
                          Cancel Booking
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-muted rounded-lg">
            <p className="text-muted-foreground mb-4">No bookings found</p>
            <Button asChild>
              <Link href="/search">Browse Packages</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedBooking && showDetailsModal && (
        <BookingDetailsModal booking={selectedBooking} onClose={() => setShowDetailsModal(false)} />
      )}
      {selectedBooking && showModifyModal && (
        <ModifyBookingModal
          booking={selectedBooking}
          onClose={() => setShowModifyModal(false)}
          onSave={handleSaveModification}
        />
      )}
      {selectedBooking && showCancelModal && (
        <CancelBookingModal
          booking={selectedBooking}
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleConfirmCancellation}
        />
      )}
      {selectedBooking && showSupportModal && (
        <SupportModal
          booking={selectedBooking}
          onClose={() => setShowSupportModal(false)}
          onSubmit={handleSubmitSupport}
        />
      )}
    </div>
  )
}
