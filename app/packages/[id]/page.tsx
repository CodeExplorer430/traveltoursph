"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Star, MapPin, Clock, ArrowLeft, Heart, Share2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PackageGallery from "@/components/package-gallery"
import PackageItinerary from "@/components/package-itinerary"
import PackageReviews from "@/components/package-reviews"
import BookingWidget from "@/components/booking-widget"

// Mock data - in a real app, this would come from a database
const packageData = {
  1: {
    id: 1,
    name: "Boracay Beach Paradise",
    destination: "Boracay Island",
    price: 12999,
    rating: 4.8,
    reviewCount: 324,
    duration: "3 Days",
    images: [
      "https://www.globeguide.ca/wp-content/uploads/2013/08/Philippines-Boracay-Sand-sign.jpg",
      "https://www.globeguide.ca/wp-content/uploads/2013/08/shutterstock_162619124-e1419291569726.jpg",
      "https://www.globeguide.ca/wp-content/uploads/2013/08/Philippines-Boracay-White-beach-aerial.jpg",
      "https://www.globeguide.ca/wp-content/uploads/2013/08/Philippines-Boracay-White-Beach-trees.jpg",
    ],
    description:
      "Experience the ultimate beach getaway at Boracay Island. Enjoy pristine white sand beaches, crystal-clear waters, and world-class resorts. Perfect for relaxation, water sports, and unforgettable sunsets.",
    highlights: [
      "White sand beaches",
      "Water sports activities",
      "Luxury resort accommodation",
      "Beach sunset tours",
      "Local cuisine dining",
      "Spa and wellness",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Beach Relaxation",
        description:
          "Arrive at Boracay and check into your resort. Spend the afternoon relaxing on the beach and enjoying the sunset.",
        activities: ["Airport transfer", "Check-in", "Beach time", "Sunset viewing"],
      },
      {
        day: 2,
        title: "Water Sports Adventure",
        description: "Experience thrilling water sports including parasailing, jet skiing, and snorkeling.",
        activities: ["Parasailing", "Jet skiing", "Snorkeling", "Beach lunch"],
      },
      {
        day: 3,
        title: "Departure",
        description: "Enjoy a final breakfast and depart for the airport.",
        activities: ["Breakfast", "Last-minute shopping", "Airport transfer"],
      },
    ],
    included: [
      "2 nights accommodation in 4-star resort",
      "Daily breakfast",
      "Airport transfers",
      "Water sports equipment",
      "Beach tour guide",
      "Travel insurance",
    ],
    notIncluded: ["Meals (except breakfast)", "Personal expenses", "Optional activities"],
    reviews: [
      {
        id: 1,
        author: "Maria Santos",
        rating: 5,
        date: "2025-01-15",
        title: "Amazing experience!",
        comment: "The resort was beautiful and the staff was very helpful. Highly recommended!",
        verified: true,
      },
      {
        id: 2,
        author: "Juan Dela Cruz",
        rating: 4,
        date: "2025-01-10",
        title: "Great value for money",
        comment: "Good package overall. The itinerary was well-planned and the activities were fun.",
        verified: true,
      },
    ],
  },
  2: {
    id: 2,
    name: "Palawan Island Adventure",
    destination: "Palawan",
    price: 15999,
    rating: 4.9,
    reviewCount: 512,
    duration: "4 Days",
    images: [
      "https://www.agoda.com/wp-content/uploads/2024/03/Coron-Palawan.jpg",
      "https://www.agoda.com/wp-content/uploads/2024/03/Corong-Corong-El-Nindo-Palawan.jpg",
      "https://www.agoda.com/wp-content/uploads/2024/03/Puerto-Princesa-Subterranean-River-Palawan.jpg",
      "https://cdn.tourradar.com/s3/tour/1500x800/239977_6438cc4a4c0ea.jpg",
    ],
    description:
      "Discover the natural wonders of Palawan with its stunning lagoons, limestone cliffs, and pristine beaches. This adventure-packed tour includes island hopping, snorkeling, and exploring hidden coves.",
    highlights: [
      "Big Lagoon exploration",
      "Island hopping tours",
      "Snorkeling in crystal waters",
      "Limestone cliff views",
      "Local village visits",
      "Sunset cruises",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Puerto Princesa",
        description: "Arrive and settle into your accommodation. Evening orientation and dinner.",
        activities: ["Arrival", "Check-in", "Orientation", "Dinner"],
      },
      {
        day: 2,
        title: "Underground River Tour",
        description: "Explore the famous Puerto Princesa Underground River, a UNESCO World Heritage Site.",
        activities: ["Underground river tour", "Lunch", "Local market visit"],
      },
      {
        day: 3,
        title: "Island Hopping Adventure",
        description: "Full day island hopping with snorkeling at multiple locations.",
        activities: ["Island hopping", "Snorkeling", "Beach lunch", "Sunset cruise"],
      },
      {
        day: 4,
        title: "Departure",
        description: "Final breakfast and departure.",
        activities: ["Breakfast", "Souvenir shopping", "Airport transfer"],
      },
    ],
    included: [
      "3 nights accommodation",
      "Daily breakfast",
      "Airport transfers",
      "Underground river tour",
      "Island hopping tour",
      "Snorkeling equipment",
      "Travel insurance",
    ],
    notIncluded: ["Meals (except breakfast)", "Personal expenses", "Tips and gratuities"],
    reviews: [
      {
        id: 1,
        author: "Ana Garcia",
        rating: 5,
        date: "2025-01-12",
        title: "Unforgettable adventure!",
        comment: "The underground river was breathtaking. Best trip ever!",
        verified: true,
      },
    ],
  },
  3: {
    id: 3,
    name: "Cebu City Explorer",
    destination: "Cebu",
    price: 9999,
    rating: 4.6,
    reviewCount: 287,
    duration: "2 Days",
    images: [
      "https://blog.worldpinoyflights.com/wp-content/uploads/2025/07/Fort-San-PedroThings-to-do-in-Cebu-City-World-Pinoy-Flights-Blog-1024x580.jpg",
      "https://blog.worldpinoyflights.com/wp-content/uploads/2025/07/Magellans-CrossThings-to-do-in-Cebu-City-World-Pinoy-Flights-Blog-1024x580.jpg",
      "https://blog.worldpinoyflights.com/wp-content/uploads/2025/07/Cebu-Metropolitan-CathedralThings-to-do-in-Cebu-City-World-Pinoy-Flights-Blog-1024x580.jpg",
      "https://blog.worldpinoyflights.com/wp-content/uploads/2025/07/Watch-whales-and-sharks-in-Oslob-townThings-to-do-in-Cebu-City-World-Pinoy-Flights-Blog-1024x580.jpg",
    ],
    description:
      "Explore the vibrant city of Cebu, rich in history and culture. Visit historical landmarks, enjoy local cuisine, and experience the warm Filipino hospitality in the Queen City of the South.",
    highlights: [
      "Magellan's Cross",
      "Basilica del Santo Niño",
      "Fort San Pedro",
      "Tops Lookout panoramic views",
      "Local street food tour",
      "Shopping at Ayala Center",
    ],
    itinerary: [
      {
        day: 1,
        title: "Historical City Tour",
        description: "Explore Cebu's rich history with visits to major landmarks and cultural sites.",
        activities: ["Magellan's Cross", "Basilica del Santo Niño", "Fort San Pedro", "Lunch at local restaurant"],
      },
      {
        day: 2,
        title: "City Views & Shopping",
        description: "Enjoy panoramic city views and shopping at modern malls.",
        activities: ["Tops Lookout", "Temple of Leah", "Ayala Center shopping", "Departure"],
      },
    ],
    included: [
      "1 night accommodation in city hotel",
      "Daily breakfast",
      "City tour with guide",
      "Entrance fees",
      "Transportation",
    ],
    notIncluded: ["Lunch and dinner", "Personal shopping", "Optional activities"],
    reviews: [
      {
        id: 1,
        author: "Pedro Reyes",
        rating: 5,
        date: "2025-01-20",
        title: "Great cultural experience",
        comment: "Loved learning about Cebu's history. The guide was very knowledgeable!",
        verified: true,
      },
      {
        id: 2,
        author: "Lisa Chen",
        rating: 4,
        date: "2025-01-18",
        title: "Good city tour",
        comment: "Well organized tour. Would have liked more time at each location.",
        verified: true,
      },
    ],
  },
  4: {
    id: 4,
    name: "Siargao Surfing Retreat",
    destination: "Siargao Island",
    price: 11999,
    rating: 4.7,
    reviewCount: 198,
    duration: "3 Days",
    images: [
      "https://static.wixstatic.com/media/b867d4_6942cb528eb6462f819de64a70def6ee~mv2.jpg/v1/fill/w_1920,h_1099,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/b867d4_6942cb528eb6462f819de64a70def6ee~mv2.jpg",
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/241522713.jpg?k=bc4703c1bf5e68abe12e51b2b27ca1b2f5bc44964066eb1f122fc93274b219fd&o=&s=1024x",
      "https://tickettoridegroup.com/blog/wp-content/uploads/2017/06/Philippines-Blog-30-768x512.jpg",
      "https://tickettoridegroup.com/blog/wp-content/uploads/2017/06/Philippines-Blog-15-768x512.jpg",
    ],
    description:
      "Experience the surfing capital of the Philippines! Siargao offers world-class waves, pristine beaches, and a laid-back island vibe perfect for surfers and beach lovers alike.",
    highlights: [
      "Cloud 9 surfing",
      "Surfing lessons included",
      "Island hopping",
      "Magpupungko Rock Pools",
      "Sugba Lagoon visit",
      "Beach bonfire nights",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Surf Orientation",
        description: "Arrive at Siargao and get oriented with your surfing equipment and the famous Cloud 9 break.",
        activities: ["Airport pickup", "Check-in", "Surf orientation", "Sunset at Cloud 9"],
      },
      {
        day: 2,
        title: "Surfing & Island Hopping",
        description: "Morning surf session followed by island hopping adventure.",
        activities: ["Surf lessons", "Island hopping", "Sugba Lagoon", "Beach dinner"],
      },
      {
        day: 3,
        title: "Free Surfing & Departure",
        description: "Final surf session before departure.",
        activities: ["Morning surf", "Brunch", "Free time", "Airport transfer"],
      },
    ],
    included: [
      "2 nights beachfront accommodation",
      "Daily breakfast",
      "Surfing lessons and board rental",
      "Island hopping tour",
      "Airport transfers",
    ],
    notIncluded: ["Lunch and dinner", "Additional surf sessions", "Personal expenses"],
    reviews: [
      {
        id: 1,
        author: "Jake Morrison",
        rating: 5,
        date: "2025-01-22",
        title: "Surfer's paradise!",
        comment: "Amazing waves and great instructors. Best surf trip ever!",
        verified: true,
      },
    ],
  },
  5: {
    id: 5,
    name: "Banaue Rice Terraces Trek",
    destination: "Banaue",
    price: 8999,
    rating: 4.7,
    reviewCount: 156,
    duration: "2 Days",
    images: [
      "https://www.ottsworld.com/wp-content/uploads/2020/03/Batad-Rice-Terraces-3577.jpg",
      "https://www.ottsworld.com/wp-content/uploads/2020/03/Batad-Rice-Terraces-3572.jpg",
      "https://www.ottsworld.com/wp-content/uploads/2020/03/Batad-Rice-Terraces-6139.jpg",
      "https://www.ottsworld.com/wp-content/uploads/2020/03/Batad-Rice-Terraces-6999.jpg",
    ],
    description:
      "Trek through the magnificent 2000-year-old rice terraces of Banaue, a UNESCO World Heritage Site. Experience indigenous culture and breathtaking mountain landscapes.",
    highlights: [
      "Banaue Rice Terraces viewpoint",
      "Batad Rice Terraces trek",
      "Indigenous village visits",
      "Local Ifugao culture",
      "Mountain scenery",
      "Traditional lunch",
    ],
    itinerary: [
      {
        day: 1,
        title: "Banaue Arrival & Viewpoint",
        description: "Travel to Banaue and visit the main viewpoint.",
        activities: ["Travel to Banaue", "Check-in", "Banaue viewpoint", "Cultural orientation"],
      },
      {
        day: 2,
        title: "Batad Trek & Return",
        description: "Trek to Batad Rice Terraces and return to Manila.",
        activities: ["Early Batad trek", "Village visit", "Traditional lunch", "Return journey"],
      },
    ],
    included: [
      "1 night homestay accommodation",
      "All meals",
      "Trek guide",
      "Transportation from Manila",
      "Entrance fees",
    ],
    notIncluded: ["Personal trekking gear", "Tips for guides", "Snacks"],
    reviews: [
      {
        id: 1,
        author: "Sarah Williams",
        rating: 5,
        date: "2025-01-19",
        title: "Breathtaking views!",
        comment: "The rice terraces are incredible. Great cultural experience!",
        verified: true,
      },
    ],
  },
  6: {
    id: 6,
    name: "Coron Island Hopping",
    destination: "Coron",
    price: 13999,
    rating: 4.8,
    reviewCount: 289,
    duration: "3 Days",
    images: [
      "https://gttp.images.tshiftcdn.com/196377/x/0/?height=1200&bg-color=%23000&quality=75&dpr=1",
      "https://gttp.images.tshiftcdn.com/196373/x/0/?height=1200&bg-color=%23000&quality=75&dpr=1",
      "https://gttp.images.tshiftcdn.com/196374/x/0/?height=1200&bg-color=%23000&quality=75&dpr=1",
      "https://gttp.images.tshiftcdn.com/466118/x/0/.jpg?height=1200&bg-color=%23000&quality=75&dpr=1",
    ],
    description:
      "Discover the hidden gems of Coron with pristine lagoons, crystal-clear lakes, and world-class wreck diving sites. Paradise awaits in this tropical haven.",
    highlights: [
      "Kayangan Lake",
      "Twin Lagoon",
      "Barracuda Lake",
      "Siete Pecados snorkeling",
      "Wreck diving sites",
      "Beach camping option",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Town Tour",
        description: "Arrive in Coron and explore the town.",
        activities: ["Airport transfer", "Check-in", "Mt. Tapyas sunset", "Dinner at local restaurant"],
      },
      {
        day: 2,
        title: "Island Hopping Adventure",
        description: "Full day island hopping to famous spots.",
        activities: ["Kayangan Lake", "Twin Lagoon", "Siete Pecados snorkeling", "Beach picnic"],
      },
      {
        day: 3,
        title: "Free Day & Departure",
        description: "Optional activities or relaxation before departure.",
        activities: ["Optional diving", "Shopping", "Lunch", "Airport transfer"],
      },
    ],
    included: [
      "2 nights hotel accommodation",
      "Daily breakfast",
      "Island hopping tour",
      "Snorkeling equipment",
      "Airport transfers",
      "Tour guide",
    ],
    notIncluded: ["Lunch and dinner", "Diving fees", "Environmental fees"],
    reviews: [
      {
        id: 1,
        author: "Mike Chen",
        rating: 5,
        date: "2025-01-21",
        title: "Paradise on Earth!",
        comment: "Kayangan Lake is stunning! Best island hopping experience ever.",
        verified: true,
      },
      {
        id: 2,
        author: "Emma Davis",
        rating: 5,
        date: "2025-01-17",
        title: "Unforgettable!",
        comment: "The lagoons are magical. Highly recommend this tour!",
        verified: true,
      },
    ],
  },
}

export default function PackageDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const [pkg, setPkg] = useState<typeof packageData[keyof typeof packageData] | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  // Load package data
  useEffect(() => {
    params.then(({ id }) => {
      setPkg(packageData[id as keyof typeof packageData])
    })
  }, [params])

  if (!pkg) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Package not found</h1>
          <Button asChild>
            <Link href="/packages">Back to Packages</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <div className="bg-white border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Search
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            <PackageGallery images={pkg.images} title={pkg.name} />

            {/* Package Info */}
            <div className="mt-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{pkg.name}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{pkg.destination}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="bg-transparent"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Button variant="outline" size="icon" className="bg-transparent">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(pkg.rating) ? "fill-accent text-accent" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-foreground">{pkg.rating}</span>
                <span className="text-muted-foreground">({pkg.reviewCount} reviews)</span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">About This Package</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{pkg.description}</p>

                <h3 className="text-lg font-semibold text-foreground mb-3">Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pkg.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="itinerary" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-muted">
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="included">What's Included</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="itinerary" className="mt-6">
                  <PackageItinerary itinerary={pkg.itinerary} />
                </TabsContent>

                <TabsContent value="included" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-4">What&apos;s Included</h3>
                      <ul className="space-y-3">
                        {pkg.included.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-4">Not Included</h3>
                      <ul className="space-y-3">
                        {pkg.notIncluded.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <PackageReviews reviews={pkg.reviews} rating={pkg.rating} totalReviews={pkg.reviewCount} />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <BookingWidget package={pkg} />
          </div>
        </div>
      </div>
    </div>
  )
}
