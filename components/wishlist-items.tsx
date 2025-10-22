"use client"

import Link from "next/link"
import { Star, MapPin, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WishlistItem {
  id: number
  name: string
  destination: string
  price: number
  rating: number
  reviews: number
  image: string
  duration: string
}

interface WishlistItemsProps {
  items: WishlistItem[]
}

export default function WishlistItems({ items }: WishlistItemsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">My Wishlist</h2>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <Link key={item.id} href={`/packages/${item.id}`}>
              <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col group">
                {/* Image */}
                <div className="h-48 bg-gradient-to-br from-secondary to-secondary/60 overflow-hidden relative">
                  <img
                    src={item.image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full transition-colors">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-lg text-foreground line-clamp-2 mb-2">{item.name}</h3>

                  <div className="flex items-center gap-1 mb-3 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{item.destination}</span>
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(item.rating) ? "fill-accent text-accent" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {item.rating} ({item.reviews})
                    </span>
                  </div>

                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground">{item.duration}</p>
                        <p className="text-primary font-bold text-lg">₱{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <Button className="w-full" size="sm">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted rounded-lg">
          <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
          <Button asChild>
            <Link href="/search">Explore Packages</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
