import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface DashboardHeaderProps {
  user: {
    name: string
    email: string
  }
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <div className="bg-primary text-primary-foreground border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
          <p className="text-primary-foreground/80 mt-1">Manage your bookings and travel plans</p>
        </div>
      </div>
    </div>
  )
}
