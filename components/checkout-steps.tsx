import { Check } from "lucide-react"

interface CheckoutStepsProps {
  currentStep: number
}

const steps = [
  { number: 1, title: "Review Booking", description: "Confirm your package details" },
  { number: 2, title: "Traveler Info", description: "Enter passenger information" },
  { number: 3, title: "Payment", description: "Complete your payment" },
]

export default function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, idx) => (
        <div key={step.number} className="flex items-center flex-1">
          {/* Step Circle */}
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${
              currentStep > step.number
                ? "bg-accent text-accent-foreground"
                : currentStep === step.number
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
          </div>

          {/* Step Info */}
          <div className="ml-3 hidden sm:block">
            <p className="text-xs font-semibold text-muted-foreground">Step {step.number}</p>
            <p className="text-sm font-semibold text-foreground">{step.title}</p>
          </div>

          {/* Connector Line */}
          {idx < steps.length - 1 && (
            <div
              className={`flex-1 h-1 mx-4 rounded-full transition-all ${
                currentStep > step.number ? "bg-accent" : "bg-muted"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
