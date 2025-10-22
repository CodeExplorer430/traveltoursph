import HeroSection from "@/components/hero-section"
import FeaturedPackages from "@/components/featured-packages"

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedPackages />

      {/* CTA Section */}
      <section className="py-16 bg-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Ready to Book Your Trip?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have discovered amazing experiences with TravelPH
          </p>
        </div>
      </section>
    </div>
  )
}
