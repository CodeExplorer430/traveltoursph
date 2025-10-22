"use client"

import { Suspense, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import BookingStepsProgress from "@/components/booking-steps-progress"
import PackageCustomization from "@/components/package-customization"
import BookingSummary from "@/components/booking-summary"
import TravelerDetails from "@/components/traveler-details"
import PaymentForm from "@/components/payment-form"

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const packageId = searchParams.get("packageId") || "1"
  const travelers = Number.parseInt(searchParams.get("travelers") || "2")
  const checkIn = searchParams.get("checkIn") || ""

  const [currentStep, setCurrentStep] = useState(1)
  const [customizationTotal, setCustomizationTotal] = useState(0)

  // Mock package data
  const packageData = {
    id: Number.parseInt(packageId),
    name: "Boracay Beach Paradise",
    destination: "Boracay Island",
    price: 12999,
    duration: "3 Days",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
  }

  const basePrice = travelers * packageData.price
  const totalPrice = basePrice + customizationTotal
  const taxes = Math.round(totalPrice * 0.12)
  const finalTotal = totalPrice + taxes

  const steps = [
    { id: 1, title: "Customize", description: "Personalize your package" },
    { id: 2, title: "Review", description: "Check booking details" },
    { id: 3, title: "Travelers", description: "Enter traveler info" },
    { id: 4, title: "Payment", description: "Secure checkout" },
  ]

  const handleCustomizationUpdate = (_customizations: unknown[], total: number) => {
    setCustomizationTotal(total)
  }

  const handleTravelerDataSubmit = () => {
    setCurrentStep(4)
  }

  const handlePaymentSubmit = () => {
    // Navigate to confirmation page with booking details
    router.push(
      `/booking-confirmation?ref=TRV${Date.now()}&package=${encodeURIComponent(packageData.name)}&total=${finalTotal}`,
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href={`/packages/${packageId}`}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Package
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <BookingStepsProgress currentStep={currentStep} steps={steps} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Checkout Steps */}
          <div className="lg:col-span-2">
            {/* Step Content */}
            <div className="bg-card border border-border rounded-lg p-6 md:p-8">
              {currentStep === 1 && (
                <div>
                  <PackageCustomization packageId={packageData.id} onUpdate={handleCustomizationUpdate} />
                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => router.back()}
                      className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <BookingSummary
                  packageData={packageData}
                  travelers={travelers}
                  checkIn={checkIn}
                  onContinue={() => setCurrentStep(3)}
                />
              )}

              {currentStep === 3 && (
                <TravelerDetails
                  travelers={travelers}
                  onSubmit={handleTravelerDataSubmit}
                  onBack={() => setCurrentStep(2)}
                />
              )}

              {currentStep === 4 && (
                <PaymentForm totalPrice={finalTotal} onSubmit={handlePaymentSubmit} onBack={() => setCurrentStep(3)} />
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24 h-fit">
              <h3 className="font-bold text-lg text-foreground mb-6">Order Summary</h3>

              {/* Package Info */}
              <div className="mb-6 pb-6 border-b border-border">
                <img
                  src={packageData.image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"}
                  alt={packageData.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-semibold text-foreground mb-1">{packageData.name}</h4>
                <p className="text-sm text-muted-foreground">{packageData.destination}</p>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    ₱{packageData.price.toLocaleString()} × {travelers} travelers
                  </span>
                  <span className="font-semibold text-foreground">₱{basePrice.toLocaleString()}</span>
                </div>
                {customizationTotal > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Customizations</span>
                    <span className="font-semibold text-foreground">₱{customizationTotal.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold text-foreground">₱{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxes & Fees (12%)</span>
                  <span className="font-semibold text-foreground">₱{taxes.toLocaleString()}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">₱{finalTotal.toLocaleString()}</span>
              </div>

              {/* Info */}
              <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground space-y-2">
                <p>✓ Free cancellation up to 7 days</p>
                <p>✓ Secure payment</p>
                <p>✓ Instant confirmation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
