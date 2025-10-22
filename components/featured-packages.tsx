"use client"

import Link from "next/link"
import { Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Package {
  id: number
  name: string
  destination: string
  price: number
  rating: number
  reviews: number
  image: string
  duration: string
}

const packages: Package[] = [
  {
    id: 1,
    name: "Boracay Beach Paradise",
    destination: "Boracay Island",
    price: 12999,
    rating: 4.8,
    reviews: 324,
    image: "https://www.globeguide.ca/wp-content/uploads/2020/03/Philippines-Boracay-beach.jpg",
    duration: "3 Days",
  },
  {
    id: 2,
    name: "Palawan Island Adventure",
    destination: "Palawan",
    price: 15999,
    rating: 4.9,
    reviews: 512,
    image: "https://www.agoda.com/wp-content/uploads/2024/03/Big-Lagoon-El-Nindo-Palawan.jpg",
    duration: "4 Days",
  },
  {
    id: 3,
    name: "Cebu City Explorer",
    destination: "Cebu",
    price: 9999,
    rating: 4.6,
    reviews: 287,
    image: "https://blog.worldpinoyflights.com/wp-content/uploads/2025/07/Basilica-Minore-del-Santo-NinoThings-to-do-in-Cebu-City-World-Pinoy-Flights-Blog-1024x580.jpg",
    duration: "2 Days",
  },
  {
    id: 4,
    name: "Siargao Surfing Retreat",
    destination: "Siargao Island",
    price: 11999,
    rating: 4.7,
    reviews: 198,
    image: "https://static.wixstatic.com/media/03716f_39b527434c05421ca6256adae89ffb5a~mv2.jpg/v1/fill/w_962,h_742,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/03716f_39b527434c05421ca6256adae89ffb5a~mv2.jpg",
    duration: "3 Days",
  },
]

export default function FeaturedPackages() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Featured Packages</h2>
          <p className="text-muted-foreground text-lg">
            Discover our most popular travel packages curated just for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <Link key={pkg.id} href={`/packages/${pkg.id}`}>
              <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                {/* Image */}
                <div className="h-48 bg-gradient-to-br from-secondary to-secondary/60 overflow-hidden">
                  <img
                    src={pkg.image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"}
                    alt={pkg.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg text-foreground line-clamp-2">{pkg.name}</h3>
                  </div>

                  <div className="flex items-center gap-1 mb-3 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{pkg.destination}</span>
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(pkg.rating) ? "fill-accent text-accent" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {pkg.rating} ({pkg.reviews})
                    </span>
                  </div>

                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground">{pkg.duration}</p>
                        <p className="text-primary font-bold text-lg">₱{pkg.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <Button className="w-full" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/search">View All Packages</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
