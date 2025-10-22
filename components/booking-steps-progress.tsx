"use client"

import { Check } from "lucide-react"

interface Step {
  id: number
  title: string
  description: string
}

interface BookingStepsProgressProps {
  currentStep: number
  steps: Step[]
}

export default function BookingStepsProgress({ currentStep, steps }: BookingStepsProgressProps) {
  return (
    <div className="w-full py-8">
      <div className="max-w-4xl mx-auto">
        {/* Steps indicator */}
        <div className="flex items-center justify-between relative">
          {/* Progress line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-border -z-10">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {steps.map((step, index) => {
            const stepNumber = index + 1
            const isCompleted = currentStep > stepNumber
            const isCurrent = currentStep === stepNumber
            const isPending = currentStep < stepNumber

            return (
              <div key={step.id} className="flex flex-col items-center flex-1">
                {/* Step circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    isCompleted
                      ? "bg-primary text-white"
                      : isCurrent
                        ? "bg-primary text-white ring-4 ring-primary/20"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
                </div>

                {/* Step label */}
                <div className="mt-3 text-center">
                  <p
                    className={`text-sm font-medium ${
                      isCurrent ? "text-foreground" : isPending ? "text-muted-foreground" : "text-foreground"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 hidden md:block">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
