"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, MapPin, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const isLoggedIn = false // TODO: Replace with actual auth state

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">TravelPH</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/search" className="text-foreground hover:text-primary transition-colors">
              Packages
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm">Account</span>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2">
                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-muted transition-colors">
                      Dashboard
                    </Link>
                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-muted transition-colors">
                      My Bookings
                    </Link>
                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-muted transition-colors">
                      Settings
                    </Link>
                    <hr className="my-2 border-border" />
                    <button className="w-full text-left px-4 py-2 hover:bg-muted transition-colors flex items-center gap-2">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button variant="outline" asChild className="hidden sm:inline-flex bg-transparent">
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/register">Sign Up</Link>
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-border">
            <Link href="/" className="block px-4 py-2 hover:bg-muted transition-colors">
              Home
            </Link>
            <Link href="/search" className="block px-4 py-2 hover:bg-muted transition-colors">
              Packages
            </Link>
            <Link href="/about" className="block px-4 py-2 hover:bg-muted transition-colors">
              About
            </Link>
            <Link href="/contact" className="block px-4 py-2 hover:bg-muted transition-colors">
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
