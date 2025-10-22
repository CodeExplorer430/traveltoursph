"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Calendar, Users, MapPin, Mail, Download, Share2, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const bookingRef = searchParams.get("ref") || "TRV" + Math.random().toString(36).substr(2, 9).toUpperCase()
  const packageName = searchParams.get("package") || "Travel Package"
  const totalPrice = searchParams.get("total") || "0"

  // Simulated booking confirmation data
  const confirmationData = {
    bookingReference: bookingRef,
    status: "Confirmed",
    packageName: packageName,
    destination: "Boracay Island",
    checkInDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    duration: "3 Days / 2 Nights",
    travelers: 2,
    totalPrice: parseFloat(totalPrice),
    confirmationEmail: "confirmation@traveltours.ph",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Success Header */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Booking Confirmed!</h1>
          <p className="text-xl text-white/90 mb-2">
            Thank you for choosing TravelTours. Your adventure awaits!
          </p>
          <p className="text-lg text-white/80">
            Booking Reference: <span className="font-mono font-bold">{confirmationData.bookingReference}</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Email Confirmation Notice */}
        <Card className="p-6 mb-8 border-l-4 border-l-primary bg-primary/5">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Confirmation Email Sent</h3>
              <p className="text-sm text-muted-foreground">
                A detailed confirmation email has been sent to your registered email address. Please check your inbox
                and spam folder.
              </p>
            </div>
          </div>
        </Card>

        {/* Booking Details */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Booking Details</h2>

          <div className="space-y-6">
            {/* Package Info */}
            <div className="pb-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">{confirmationData.packageName}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Destination:</span>
                  <span className="font-medium text-foreground">{confirmationData.destination}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Check-in:</span>
                  <span className="font-medium text-foreground">{confirmationData.checkInDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium text-foreground">{confirmationData.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Travelers:</span>
                  <span className="font-medium text-foreground">{confirmationData.travelers} People</span>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="pb-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Payment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Package Total</span>
                  <span className="font-medium text-foreground">
                    ₱{(confirmationData.totalPrice / 1.12).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxes & Fees</span>
                  <span className="font-medium text-foreground">
                    ₱
                    {((confirmationData.totalPrice / 1.12) * 0.12).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-border">
                  <span className="font-semibold text-foreground">Total Paid</span>
                  <span className="text-xl font-bold text-primary">
                    ₱{confirmationData.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <CheckCircle className="w-4 h-4 mr-1" />
                {confirmationData.status}
              </span>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">What's Next?</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Check Your Email</h4>
                <p className="text-sm text-muted-foreground">
                  You&apos;ll receive a detailed itinerary and booking voucher within 24 hours.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Prepare Your Documents</h4>
                <p className="text-sm text-muted-foreground">
                  Ensure your passport and ID are valid. Keep digital and printed copies ready.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-semibold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Get Ready for Your Trip</h4>
                <p className="text-sm text-muted-foreground">
                  We&apos;ll send reminders and travel tips as your departure date approaches.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Download Receipt
          </Button>
          <Button variant="outline" className="gap-2">
            <Mail className="w-4 h-4" />
            Email Confirmation
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share Trip
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="flex-1">
            <Link href="/dashboard" className="gap-2">
              View My Bookings
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex-1 gap-2">
            <Link href="/">
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Support */}
        <div className="mt-12 p-6 bg-muted rounded-lg text-center">
          <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Our customer support team is available 24/7 to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
            <span className="text-muted-foreground">
              Email:{" "}
              <a href="mailto:support@traveltours.ph" className="text-primary hover:underline">
                support@traveltours.ph
              </a>
            </span>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              Phone:{" "}
              <a href="tel:+63281234567" className="text-primary hover:underline">
                +63 2 8123 4567
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BookingConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading confirmation...</p>
          </div>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  )
}
