import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Award, Globe, Heart } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const values = [
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connecting travelers with the world's most beautiful destinations",
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction is our top priority in every booking",
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "Curated packages from trusted travel partners",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Experienced travel consultants ready to help",
    },
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About TravelPH</h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Discover the Philippines with confidence. We&apos;re dedicated to creating unforgettable travel experiences.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-neutral-900">Our Story</h2>
              <p className="text-neutral-600 mb-4 leading-relaxed">
                Founded in 2015, TravelPH has been helping thousands of travelers explore the stunning beauty of the
                Philippines. What started as a small travel agency has grown into a trusted platform connecting
                adventurers with unforgettable experiences.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                We believe that travel is more than just visiting places—it&apos;s about creating memories, connecting with
                cultures, and discovering yourself. Our mission is to make travel accessible, affordable, and
                extraordinary for everyone.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <Globe className="w-24 h-24 text-primary mx-auto mb-4" />
                <p className="text-neutral-600">Explore the Philippines</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-neutral-900">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index}>
                  <CardHeader>
                    <Icon className="w-8 h-8 text-primary mb-2" />
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white rounded-lg p-8 mb-16">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <p className="text-neutral-600">Happy Travelers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <p className="text-neutral-600">Destinations</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <p className="text-neutral-600">Bookings</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">9.8/10</div>
              <p className="text-neutral-600">Customer Rating</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-neutral-900">Ready to Explore?</h2>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Start your next adventure with TravelPH. Browse our curated packages and book your dream trip today.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/search">Browse Packages</Link>
          </Button>
        </section>
      </main>
    </div>
  )
}
