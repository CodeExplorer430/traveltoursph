import Link from "next/link"
import { CheckCircle, Download, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OrderConfirmationProps {
  packageData: any
  travelers: number
  totalPrice: number
}

export default function OrderConfirmation({ packageData, travelers, totalPrice }: OrderConfirmationProps) {
  const confirmationNumber = `TRV${Math.random().toString(36).substr(2, 9).toUpperCase()}`

  return (
    <div className="min-h-screen bg-background">
      {/* Success Message */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="w-16 h-16 text-accent" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Your travel package has been successfully booked. A confirmation email has been sent to your inbox.
        </p>

        {/* Confirmation Number */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <p className="text-sm text-muted-foreground mb-2">Confirmation Number</p>
          <p className="text-2xl font-bold text-primary font-mono">{confirmationNumber}</p>
        </div>

        {/* Booking Details */}
        <div className="bg-muted rounded-lg p-6 mb-8 text-left">
          <h2 className="font-bold text-lg text-foreground mb-4">Booking Details</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Package</span>
              <span className="font-semibold text-foreground">{packageData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Destination</span>
              <span className="font-semibold text-foreground">{packageData.destination}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-semibold text-foreground">{packageData.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Number of Travelers</span>
              <span className="font-semibold text-foreground">{travelers}</span>
            </div>
            <div className="border-t border-border pt-4 flex justify-between">
              <span className="font-semibold text-foreground">Total Amount Paid</span>
              <span className="text-xl font-bold text-primary">₱{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
          <h3 className="font-semibold text-blue-900 mb-3">What's Next?</h3>
          <ul className="space-y-2 text-sm text-blue-900">
            <li>✓ Check your email for booking confirmation and itinerary</li>
            <li>✓ Download your e-ticket and travel documents</li>
            <li>✓ Contact us 7 days before your trip for final confirmation</li>
            <li>✓ Arrive at the meeting point 30 minutes early</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Email Support</p>
              <p className="font-semibold text-foreground">support@travelph.com</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Phone Support</p>
              <p className="font-semibold text-foreground">+63 (2) 1234-5678</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="bg-transparent gap-2">
            <Download className="w-4 h-4" />
            Download Receipt
          </Button>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
