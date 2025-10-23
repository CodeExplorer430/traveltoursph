"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", subject: "", message: "" })
    alert("Thank you for your message! We'll get back to you soon.")
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+63 (2) 1234-5678",
      description: "Available Mon-Fri, 9AM-6PM",
    },
    {
      icon: Mail,
      title: "Email",
      details: "support@travelph.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: MapPin,
      title: "Address",
      details: "Manila, Philippines",
      description: "Visit our office for consultations",
    },
    {
      icon: Clock,
      title: "Hours",
      details: "Mon-Fri: 9AM-6PM",
      description: "Sat-Sun: 10AM-4PM",
    },
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-white/90">Get in touch with our travel experts</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we&apos;ll get back to you shortly</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Subject</label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message..."
                      rows={5}
                      required
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-neutral-900">Get in Touch</h2>
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900">{info.title}</h3>
                          <p className="text-primary font-medium">{info.details}</p>
                          <p className="text-sm text-neutral-600">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* FAQ Section */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-3">
                <details className="bg-white p-4 rounded-lg cursor-pointer hover:bg-neutral-50">
                  <summary className="font-medium text-neutral-900">What is your cancellation policy?</summary>
                  <p className="text-neutral-600 text-sm mt-2">
                    We offer free cancellation up to 7 days before your trip. After that, cancellation fees may apply.
                  </p>
                </details>
                <details className="bg-white p-4 rounded-lg cursor-pointer hover:bg-neutral-50">
                  <summary className="font-medium text-neutral-900">Do you offer group discounts?</summary>
                  <p className="text-neutral-600 text-sm mt-2">
                    Yes! Groups of 10 or more receive special discounts. Contact us for details.
                  </p>
                </details>
                <details className="bg-white p-4 rounded-lg cursor-pointer hover:bg-neutral-50">
                  <summary className="font-medium text-neutral-900">Can I customize my package?</summary>
                  <p className="text-neutral-600 text-sm mt-2">
                    Our travel experts can customize any package to match your preferences.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
