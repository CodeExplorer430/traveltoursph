"use client"

import { MapPin, Calendar, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BookingSummaryProps {
  packageData: any
  travelers: number
  checkIn: string
  onContinue: () => void
}

export default function BookingSummary({ packageData, travelers, checkIn, onContinue }: BookingSummaryProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Review Your Booking</h2>

      {/* Package Details */}
      <div className="bg-muted rounded-lg p-6 mb-6">
        <h3 className="font-bold text-lg text-foreground mb-4">{packageData.name}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Destination</p>
              <p className="font-semibold text-foreground">{packageData.destination}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="font-semibold text-foreground">{packageData.duration}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Check-in Date</p>
              <p className="font-semibold text-foreground">{checkIn || "Not selected"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Travelers</p>
              <p className="font-semibold text-foreground">
                {travelers} person{travelers !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div>
          <h4 className="font-semibold text-foreground mb-3">What's Included</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Accommodation</li>
            <li>✓ Daily breakfast</li>
            <li>✓ Airport transfers</li>
            <li>✓ Guided tours</li>
          </ul>
        </div>
      </div>

      {/* Cancellation Policy */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <p className="text-sm text-blue-900">
          <strong>Free Cancellation:</strong> Cancel up to 7 days before your trip for a full refund.
        </p>
      </div>

      {/* Continue Button */}
      <Button onClick={onContinue} className="w-full">
        Continue to Traveler Information
      </Button>
    </div>
  )
}
