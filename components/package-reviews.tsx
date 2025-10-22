import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Review {
  id: number
  author: string
  rating: number
  date: string
  title: string
  comment: string
  verified: boolean
}

interface PackageReviewsProps {
  reviews: Review[]
  rating: number
  totalReviews: number
}

export default function PackageReviews({ reviews, rating, totalReviews }: PackageReviewsProps) {
  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-muted rounded-lg p-6 mb-8">
        <div className="flex items-center gap-8">
          <div>
            <div className="text-4xl font-bold text-foreground">{rating}</div>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-accent text-accent" : "text-muted-foreground"}`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">Based on {totalReviews} reviews</p>
          </div>
          <Button className="ml-auto">Write a Review</Button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-foreground">{review.author}</h4>
                {review.verified && <span className="text-xs text-accent font-semibold">✓ Verified Traveler</span>}
              </div>
              <span className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center gap-2 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < review.rating ? "fill-accent text-accent" : "text-muted-foreground"}`}
                />
              ))}
            </div>

            <h5 className="font-semibold text-foreground mb-2">{review.title}</h5>
            <p className="text-muted-foreground">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
