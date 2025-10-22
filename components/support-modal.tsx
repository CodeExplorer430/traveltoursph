"use client"

import { useState } from "react"
import { X, Send, MessageCircle, Mail, Phone } from "lucide-react"
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

interface SupportModalProps {
  booking: Booking
  onClose: () => void
  onSubmit: (bookingId: number, subject: string, message: string) => void
}

export default function SupportModal({ booking, onClose, onSubmit }: SupportModalProps) {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(booking.id, subject, message)
  }

  const supportTopics = [
    "Payment and refund inquiry",
    "Change booking details",
    "Package inclusions question",
    "Special requests",
    "Travel documentation help",
    "General inquiry",
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Contact Support</h2>
              <p className="text-sm text-muted-foreground">We&apos;re here to help</p>
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
          <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
            <h3 className="font-bold text-foreground mb-1">{booking.packageName}</h3>
            <p className="text-sm text-muted-foreground">Confirmation: {booking.confirmationNumber}</p>
          </div>

          {/* Quick Contact Options */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Quick Contact Options</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <a
                href="mailto:support@travelph.com"
                className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold text-sm text-foreground">Email Us</p>
                  <p className="text-xs text-muted-foreground">support@travelph.com</p>
                </div>
              </a>
              <a
                href="tel:+639123456789"
                className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold text-sm text-foreground">Call Us</p>
                  <p className="text-xs text-muted-foreground">+63 912 345 6789</p>
                </div>
              </a>
            </div>
          </div>

          {/* Support Form */}
          <div className="border-t border-border pt-6">
            <h4 className="font-semibold text-foreground mb-4">Send us a message</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="w-full h-11 px-3 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="">Select a topic...</option>
                  {supportTopics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe your inquiry or concern in detail..."
                  required
                  className="w-full min-h-32 p-3 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                />
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Our support team typically responds within 24 hours. For urgent matters, please call us directly.
                </p>
              </div>

              <Button type="submit" className="w-full gap-2" disabled={!subject || !message.trim()}>
                <Send className="w-4 h-4" />
                Send Message
              </Button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="border-t border-border pt-6">
            <h4 className="font-semibold text-foreground mb-4">Frequently Asked Questions</h4>
            <div className="space-y-3">
              <details className="group">
                <summary className="cursor-pointer font-semibold text-sm text-foreground hover:text-primary transition-colors">
                  How do I modify my booking?
                </summary>
                <p className="mt-2 text-sm text-muted-foreground pl-4">
                  You can modify your booking by clicking the &quot;Modify Booking&quot; option in the booking actions menu. Changes are subject to availability and may affect pricing.
                </p>
              </details>
              <details className="group">
                <summary className="cursor-pointer font-semibold text-sm text-foreground hover:text-primary transition-colors">
                  What is the cancellation policy?
                </summary>
                <p className="mt-2 text-sm text-muted-foreground pl-4">
                  Cancellations made 30+ days before departure receive a full refund. 15-29 days: 50% refund. Less than 15 days: no refund.
                </p>
              </details>
              <details className="group">
                <summary className="cursor-pointer font-semibold text-sm text-foreground hover:text-primary transition-colors">
                  What documents do I need for my trip?
                </summary>
                <p className="mt-2 text-sm text-muted-foreground pl-4">
                  You&apos;ll need a valid ID, booking confirmation, and any specific travel documents mentioned in your package details. We&apos;ll send you a complete checklist before your trip.
                </p>
              </details>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card border-t border-border p-6">
          <Button variant="outline" onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
