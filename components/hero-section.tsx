import SearchBar from "./search-bar"

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">Discover Your Next Adventure</h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 text-balance max-w-2xl mx-auto">
            Explore beautiful destinations and book unforgettable travel experiences across the Philippines
          </p>
        </div>

        <SearchBar />
      </div>
    </section>
  )
}
