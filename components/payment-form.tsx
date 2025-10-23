"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, CreditCard, Shield, CheckCircle } from "lucide-react"

interface PaymentFormProps {
  totalPrice: number
  onSubmit: (data: PaymentData) => void
  onBack: () => void
}

interface PaymentData {
  paymentMethod: "credit_card" | "debit_card" | "gcash" | "paymaya"
  cardName?: string
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  mobileNumber?: string
  accountName?: string
  billingAddress: string
  billingCity: string
  billingZip: string
  billingCountry: string
  saveCard: boolean
}

export default function PaymentForm({ totalPrice, onSubmit, onBack }: PaymentFormProps) {
  const [paymentData, setPaymentData] = useState<PaymentData>({
    paymentMethod: "credit_card",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    mobileNumber: "",
    accountName: "",
    billingAddress: "",
    billingCity: "",
    billingZip: "",
    billingCountry: "Philippines",
    saveCard: false,
  })

  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    // Validate based on payment method
    const { paymentMethod } = paymentData
    let isValid = true

    if (paymentMethod === "credit_card" || paymentMethod === "debit_card") {
      if (!paymentData.cardName || !paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv) {
        isValid = false
      }
    } else if (paymentMethod === "gcash" || paymentMethod === "paymaya") {
      if (!paymentData.mobileNumber || !paymentData.accountName) {
        isValid = false
      }
    }

    if (!paymentData.billingAddress || !paymentData.billingCity || !paymentData.billingZip || !isValid) {
      alert("Please fill in all required fields")
      return
    }

    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      onSubmit(paymentData)
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Payment Information</h2>

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start gap-3">
        <Lock className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-green-900 mb-1">Secure Payment</p>
          <p className="text-sm text-green-800">
            Your payment information is encrypted with SSL/TLS. We comply with PCI-DSS standards and never store your full card details.
          </p>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <h3 className="font-semibold text-foreground mb-4">Select Payment Method</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { id: "credit_card", name: "Credit Card", icon: CreditCard },
            { id: "debit_card", name: "Debit Card", icon: CreditCard },
            { id: "gcash", name: "GCash", icon: Shield },
            { id: "paymaya", name: "PayMaya", icon: Shield },
          ].map((method) => (
            <button
              key={method.id}
              onClick={() => handleInputChange("paymentMethod", method.id)}
              className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                paymentData.paymentMethod === method.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <method.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{method.name}</span>
              {paymentData.paymentMethod === method.id && (
                <CheckCircle className="w-4 h-4 text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Details - Dynamic based on method */}
      {(paymentData.paymentMethod === "credit_card" || paymentData.paymentMethod === "debit_card") && (
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Card Details
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">Cardholder Name *</label>
              <Input
                type="text"
                placeholder="JUAN DELA CRUZ"
                value={paymentData.cardName || ""}
                onChange={(e) => handleInputChange("cardName", e.target.value.toUpperCase())}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">Card Number *</label>
              <Input
                type="text"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                value={paymentData.cardNumber || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim()
                  handleInputChange("cardNumber", value)
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Expiry Date *</label>
                <Input
                  type="text"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={paymentData.expiryDate || ""}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "")
                    if (value.length >= 2) {
                      value = value.slice(0, 2) + "/" + value.slice(2, 4)
                    }
                    handleInputChange("expiryDate", value)
                  }}
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">CVV *</label>
                <Input
                  type="password"
                  placeholder="123"
                  maxLength={4}
                  value={paymentData.cvv || ""}
                  onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="saveCard"
                checked={paymentData.saveCard}
                onChange={(e) => handleInputChange("saveCard", e.target.checked.toString())}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor="saveCard" className="text-sm text-foreground cursor-pointer">
                Save card for future bookings
              </label>
            </div>
          </div>
        </div>
      )}

      {/* E-Wallet Details (GCash/PayMaya) */}
      {(paymentData.paymentMethod === "gcash" || paymentData.paymentMethod === "paymaya") && (
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            {paymentData.paymentMethod === "gcash" ? "GCash" : "PayMaya"} Details
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">Mobile Number *</label>
              <Input
                type="tel"
                placeholder="+63 912 345 6789"
                maxLength={13}
                value={paymentData.mobileNumber || ""}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "")
                  if (value.length > 0 && !value.startsWith("63")) {
                    value = "63" + value
                  }
                  if (value.length > 2) {
                    value = "+63 " + value.slice(2, 5) + (value.length > 5 ? " " + value.slice(5, 8) : "") + (value.length > 8 ? " " + value.slice(8, 12) : "")
                  }
                  handleInputChange("mobileNumber", value)
                }}
              />
              <p className="text-xs text-muted-foreground mt-1">Registered mobile number for your {paymentData.paymentMethod === "gcash" ? "GCash" : "PayMaya"} account</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">Account Name *</label>
              <Input
                type="text"
                placeholder="Juan Dela Cruz"
                value={paymentData.accountName || ""}
                onChange={(e) => handleInputChange("accountName", e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">Name registered to your {paymentData.paymentMethod === "gcash" ? "GCash" : "PayMaya"} account</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-blue-900 font-medium mb-2">Payment Instructions:</p>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Click &quot;Complete Booking&quot; to proceed</li>
                <li>You will be redirected to {paymentData.paymentMethod === "gcash" ? "GCash" : "PayMaya"} app/website</li>
                <li>Enter your PIN to authorize payment</li>
                <li>Wait for confirmation before closing the window</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Billing Address */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-foreground mb-4">Billing Address</h3>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-foreground block mb-2">Street Address *</label>
            <Input
              type="text"
              placeholder="123 Rizal Avenue"
              value={paymentData.billingAddress}
              onChange={(e) => handleInputChange("billingAddress", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">City *</label>
              <Input
                type="text"
                placeholder="Manila"
                value={paymentData.billingCity}
                onChange={(e) => handleInputChange("billingCity", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">Postal Code *</label>
              <Input
                type="text"
                placeholder="1000"
                maxLength={4}
                value={paymentData.billingZip}
                onChange={(e) => handleInputChange("billingZip", e.target.value.replace(/\D/g, ""))}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground block mb-2">Country *</label>
            <select
              value={paymentData.billingCountry}
              onChange={(e) => handleInputChange("billingCountry", e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Philippines">Philippines</option>
              <option value="USA">United States</option>
              <option value="Singapore">Singapore</option>
              <option value="Japan">Japan</option>
            </select>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-card border border-border rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-foreground">Total Amount</span>
          <span className="text-2xl font-bold text-primary">₱{totalPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <Button onClick={onBack} variant="outline" className="flex-1 bg-transparent" disabled={isProcessing}>
          Back
        </Button>
        <Button onClick={handleSubmit} className="flex-1" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Complete Booking"}
        </Button>
      </div>
    </div>
  )
}
