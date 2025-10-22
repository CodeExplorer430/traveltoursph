import { Calendar } from "lucide-react"

interface ItineraryDay {
  day: number
  title: string
  description: string
  activities: string[]
}

interface PackageItineraryProps {
  itinerary: ItineraryDay[]
}

export default function PackageItinerary({ itinerary }: PackageItineraryProps) {
  return (
    <div className="space-y-6">
      {itinerary.map((day, idx) => (
        <div key={idx} className="border border-border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold">
                {day.day}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">{day.title}</h3>
              <p className="text-muted-foreground mb-4">{day.description}</p>
              <div className="flex flex-wrap gap-2">
                {day.activities.map((activity, actIdx) => (
                  <span
                    key={actIdx}
                    className="inline-flex items-center gap-1 bg-secondary text-foreground px-3 py-1 rounded-full text-sm"
                  >
                    <Calendar className="w-3 h-3" />
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
