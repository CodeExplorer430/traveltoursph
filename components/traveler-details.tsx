"use client"

import { useState } from "react"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TravelerData {
  firstName: string
  lastName: string
  email: string
  phone: string
  nationality: string
  dateOfBirth: string
  passportNumber: string
  passportExpiry: string
  specialRequests?: string
}

interface TravelerDetailsProps {
  travelers: number
  onSubmit: (data: TravelerData[]) => void
  onBack: () => void
}

export default function TravelerDetails({ travelers, onSubmit, onBack }: TravelerDetailsProps) {
  const [travelerForms, setTravelerForms] = useState<TravelerData[]>(
    Array(travelers)
      .fill(null)
      .map(() => ({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nationality: "",
        dateOfBirth: "",
        passportNumber: "",
        passportExpiry: "",
        specialRequests: "",
      })),
  )

  const handleInputChange = (index: number, field: string, value: string) => {
    const updated = [...travelerForms]
    updated[index] = { ...updated[index], [field]: value }
    setTravelerForms(updated)
  }

  const handleSubmit = () => {
    const allFilled = travelerForms.every(
      (t) =>
        t.firstName &&
        t.lastName &&
        t.email &&
        t.phone &&
        t.nationality &&
        t.dateOfBirth &&
        t.passportNumber &&
        t.passportExpiry,
    )
    if (allFilled) {
      onSubmit(travelerForms)
    } else {
      alert("Please fill in all required fields for all travelers")
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Traveler Information</h2>

      <div className="space-y-6">
        {travelerForms.map((traveler, idx) => (
          <div key={idx} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground">
                  Traveler {idx + 1} {idx === 0 && "(Lead Traveler)"}
                </h3>
                <p className="text-xs text-muted-foreground">All fields marked with * are required</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Personal Information */}
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">First Name *</label>
                <Input
                  type="text"
                  placeholder="Juan"
                  value={traveler.firstName}
                  onChange={(e) => handleInputChange(idx, "firstName", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Last Name *</label>
                <Input
                  type="text"
                  placeholder="Dela Cruz"
                  value={traveler.lastName}
                  onChange={(e) => handleInputChange(idx, "lastName", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Date of Birth *</label>
                <Input
                  type="date"
                  value={traveler.dateOfBirth}
                  onChange={(e) => handleInputChange(idx, "dateOfBirth", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Nationality *</label>
                <Input
                  type="text"
                  placeholder="Filipino"
                  value={traveler.nationality}
                  onChange={(e) => handleInputChange(idx, "nationality", e.target.value)}
                  required
                />
              </div>

              {/* Contact Information */}
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Email Address *</label>
                <Input
                  type="email"
                  placeholder="juan@example.com"
                  value={traveler.email}
                  onChange={(e) => handleInputChange(idx, "email", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Phone Number *</label>
                <Input
                  type="tel"
                  placeholder="+63 912 345 6789"
                  value={traveler.phone}
                  onChange={(e) => handleInputChange(idx, "phone", e.target.value)}
                  required
                />
              </div>

              {/* Passport Information */}
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Passport Number *</label>
                <Input
                  type="text"
                  placeholder="P1234567"
                  value={traveler.passportNumber}
                  onChange={(e) => handleInputChange(idx, "passportNumber", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Passport Expiry Date *</label>
                <Input
                  type="date"
                  value={traveler.passportExpiry}
                  onChange={(e) => handleInputChange(idx, "passportExpiry", e.target.value)}
                  required
                />
              </div>

              {/* Special Requests */}
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-foreground block mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  className="w-full min-h-[80px] px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Dietary requirements, accessibility needs, or other special requests..."
                  value={traveler.specialRequests}
                  onChange={(e) => handleInputChange(idx, "specialRequests", e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Important Notice */}
      <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
        <p className="text-sm text-foreground">
          <strong>Important:</strong> Please ensure all traveler information matches passport details exactly. Name
          discrepancies may result in denied boarding.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-8">
        <Button onClick={onBack} variant="outline" className="flex-1 bg-transparent">
          Back
        </Button>
        <Button onClick={handleSubmit} className="flex-1">
          Continue to Payment
        </Button>
      </div>
    </div>
  )
}
