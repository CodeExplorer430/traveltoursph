"use client"

import { useState } from "react"
import { Check, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface CustomizationOption {
  id: string
  name: string
  description: string
  price: number
  category: "flight" | "accommodation" | "activity" | "meal" | "transfer"
  selected: boolean
  quantity?: number
}

interface PackageCustomizationProps {
  packageId: number
  onUpdate: (customizations: CustomizationOption[], totalPrice: number) => void
}

export default function PackageCustomization({ onUpdate }: PackageCustomizationProps) {
  const [customizations, setCustomizations] = useState<CustomizationOption[]>([
    // Flight Options
    {
      id: "flight-economy",
      name: "Economy Class Flight",
      description: "Standard economy seating with basic amenities",
      price: 0,
      category: "flight",
      selected: true,
    },
    {
      id: "flight-premium",
      name: "Premium Economy Flight",
      description: "Extra legroom and enhanced meal service",
      price: 3500,
      category: "flight",
      selected: false,
    },
    {
      id: "flight-business",
      name: "Business Class Flight",
      description: "Luxury seating, priority boarding, and lounge access",
      price: 8500,
      category: "flight",
      selected: false,
    },

    // Accommodation
    {
      id: "hotel-standard",
      name: "Standard Room",
      description: "Comfortable room with essential amenities",
      price: 0,
      category: "accommodation",
      selected: true,
    },
    {
      id: "hotel-deluxe",
      name: "Deluxe Room",
      description: "Spacious room with ocean view",
      price: 2500,
      category: "accommodation",
      selected: false,
    },
    {
      id: "hotel-suite",
      name: "Executive Suite",
      description: "Luxury suite with living area and premium amenities",
      price: 5500,
      category: "accommodation",
      selected: false,
    },

    // Activities
    {
      id: "activity-island-hopping",
      name: "Island Hopping Tour",
      description: "Full day island exploration with lunch included",
      price: 1800,
      category: "activity",
      selected: false,
      quantity: 0,
    },
    {
      id: "activity-snorkeling",
      name: "Snorkeling Adventure",
      description: "Half day snorkeling with equipment and guide",
      price: 1200,
      category: "activity",
      selected: false,
      quantity: 0,
    },
    {
      id: "activity-diving",
      name: "Scuba Diving Experience",
      description: "Beginner-friendly diving session with instructor",
      price: 3500,
      category: "activity",
      selected: false,
      quantity: 0,
    },
    {
      id: "activity-sunset-cruise",
      name: "Sunset Cruise",
      description: "Romantic sunset cruise with dinner",
      price: 2200,
      category: "activity",
      selected: false,
      quantity: 0,
    },

    // Meal Plans
    {
      id: "meal-breakfast",
      name: "Breakfast Only",
      description: "Daily breakfast included",
      price: 0,
      category: "meal",
      selected: true,
    },
    {
      id: "meal-half-board",
      name: "Half Board",
      description: "Daily breakfast and dinner",
      price: 1500,
      category: "meal",
      selected: false,
    },
    {
      id: "meal-full-board",
      name: "Full Board",
      description: "All meals included (breakfast, lunch, dinner)",
      price: 2800,
      category: "meal",
      selected: false,
    },

    // Ground Transfers
    {
      id: "transfer-shared",
      name: "Shared Airport Transfer",
      description: "Shared shuttle service",
      price: 0,
      category: "transfer",
      selected: true,
    },
    {
      id: "transfer-private",
      name: "Private Airport Transfer",
      description: "Private car with driver",
      price: 1500,
      category: "transfer",
      selected: false,
    },
  ])

  const handleToggle = (id: string, category: string) => {
    setCustomizations((prev) => {
      const updated = prev.map((item) => {
        // For radio-type categories (only one can be selected)
        if (["flight", "accommodation", "meal", "transfer"].includes(category)) {
          if (item.category === category) {
            return { ...item, selected: item.id === id }
          }
        }
        // For activity (can select multiple)
        if (item.id === id) {
          const newSelected = !item.selected
          return {
            ...item,
            selected: newSelected,
            quantity: newSelected ? 1 : 0,
          }
        }
        return item
      })

      const totalPrice = calculateTotal(updated)
      onUpdate(updated, totalPrice)
      return updated
    })
  }

  const handleQuantityChange = (id: string, delta: number) => {
    setCustomizations((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id && item.quantity !== undefined) {
          const newQuantity = Math.max(0, Math.min(10, (item.quantity || 0) + delta))
          return {
            ...item,
            quantity: newQuantity,
            selected: newQuantity > 0,
          }
        }
        return item
      })

      const totalPrice = calculateTotal(updated)
      onUpdate(updated, totalPrice)
      return updated
    })
  }

  const calculateTotal = (items: CustomizationOption[]) => {
    return items.reduce((total, item) => {
      if (item.selected) {
        return total + item.price * (item.quantity || 1)
      }
      return total
    }, 0)
  }

  const renderOptions = (category: string, title: string, isRadio: boolean = true) => {
    const options = customizations.filter((item) => item.category === category)

    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
        <div className="space-y-3">
          {options.map((option) => (
            <Card
              key={option.id}
              className={`p-4 cursor-pointer transition-all ${
                option.selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
              onClick={() => handleToggle(option.id, category)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div
                    className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      option.selected ? "border-primary bg-primary" : "border-muted-foreground"
                    }`}
                  >
                    {option.selected && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{option.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-semibold text-foreground">
                    {option.price > 0 ? `+₱${option.price.toLocaleString()}` : "Included"}
                  </p>
                  {!isRadio && option.quantity !== undefined && option.selected && (
                    <div
                      className="flex items-center gap-2 mt-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleQuantityChange(option.id, -1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-sm font-medium w-6 text-center">{option.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleQuantityChange(option.id, 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Customize Your Package</h2>
        <p className="text-muted-foreground">
          Personalize your travel experience by selecting your preferred options
        </p>
      </div>

      {renderOptions("flight", "Flight Options")}
      {renderOptions("accommodation", "Accommodation Type")}
      {renderOptions("activity", "Activities & Tours", false)}
      {renderOptions("meal", "Meal Plan")}
      {renderOptions("transfer", "Ground Transfers")}

      <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Additional customizations total</span>
          <span className="text-xl font-bold text-primary">₱{calculateTotal(customizations).toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
