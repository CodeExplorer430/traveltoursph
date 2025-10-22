"use client"

import { useState } from "react"
import { X, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

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

interface CancelBookingModalProps {
  booking: Booking
  onClose: () => void
  onConfirm: (bookingId: number, reason: string) => void
}

export default function CancelBookingModal({ booking, onClose, onConfirm }: CancelBookingModalProps) {
  const [reason, setReason] = useState("")
  const [selectedReason, setSelectedReason] = useState("")

  const cancellationReasons = [
    "Change of plans",
    "Found a better deal",
    "Health or medical reasons",
    "Travel restrictions",
    "Financial constraints",
    "Other",
  ]

  const handleConfirm = () => {
    const finalReason = selectedReason === "Other" ? reason : selectedReason
    onConfirm(booking.id, finalReason)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-lg shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="bg-destructive/10 border-b border-border p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Cancel Booking</h2>
              <p className="text-sm text-muted-foreground">This action cannot be undone</p>
            </div>
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
            <h3 className="font-bold text-foreground mb-1">{booking.packageName}</h3>
            <p className="text-sm text-muted-foreground">Confirmation: {booking.confirmationNumber}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Please select a reason for cancellation:
            </label>
            <div className="space-y-2">
              {cancellationReasons.map((r) => (
                <label
                  key={r}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedReason === r
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="cancellationReason"
                    value={r}
                    checked={selectedReason === r}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm text-foreground">{r}</span>
                </label>
              ))}
            </div>
          </div>

          {selectedReason === "Other" && (
            <div>
              <label htmlFor="reason" className="block text-sm font-semibold text-foreground mb-2">
                Please specify:
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Tell us more about your reason..."
                className="w-full min-h-24 p-3 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
              />
            </div>
          )}

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold text-sm text-foreground mb-2">Refund Policy</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Cancellation 30+ days before: 100% refund</li>
              <li>• Cancellation 15-29 days before: 50% refund</li>
              <li>• Cancellation less than 15 days: No refund</li>
            </ul>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              You will receive a refund according to our cancellation policy. The refund will be processed within 5-7 business days.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-card border-t border-border p-6 flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Keep Booking
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!selectedReason || (selectedReason === "Other" && !reason.trim())}
            className="flex-1"
          >
            Confirm Cancellation
          </Button>
        </div>
      </div>
    </div>
  )
}
