"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save } from "lucide-react"

interface User {
  name: string
  email: string
  phone: string
  nationality: string
  avatar: string
}

interface ProfileSettingsProps {
  user: User
  setUser: (user: User) => void
}

export default function ProfileSettings({ user, setUser }: ProfileSettingsProps) {
  const [formData, setFormData] = useState(user)
  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate saving
    setTimeout(() => {
      setUser(formData)
      setIsSaving(false)
      alert("Profile updated successfully!")
    }, 1000)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Profile Settings</h2>

      <div className="bg-card border border-border rounded-lg p-6 max-w-2xl">
        {/* Avatar */}
        <div className="mb-8 pb-8 border-b border-border">
          <h3 className="font-semibold text-lg text-foreground mb-4">Profile Picture</h3>
          <div className="flex items-center gap-6">
            <img src={formData.avatar || "/placeholder.svg"} alt={formData.name} className="w-20 h-20 rounded-full" />
            <Button variant="outline" className="bg-transparent">
              Change Picture
            </Button>
          </div>
        </div>

        {/* Personal Information */}
        <div className="mb-8 pb-8 border-b border-border">
          <h3 className="font-semibold text-lg text-foreground mb-4">Personal Information</h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">Full Name</label>
              <Input type="text" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} />
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">Email Address</label>
              <Input type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">Phone Number</label>
              <Input type="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">Nationality</label>
              <Input
                type="text"
                value={formData.nationality}
                onChange={(e) => handleInputChange("nationality", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="mb-8">
          <h3 className="font-semibold text-lg text-foreground mb-4">Security</h3>

          <div className="space-y-3">
            <Button variant="outline" className="w-full bg-transparent justify-start">
              Change Password
            </Button>
            <Button variant="outline" className="w-full bg-transparent justify-start">
              Two-Factor Authentication
            </Button>
            <Button variant="outline" className="w-full bg-transparent justify-start">
              Active Sessions
            </Button>
          </div>
        </div>

        {/* Save Button */}
        <Button onClick={handleSave} disabled={isSaving} className="w-full gap-2">
          <Save className="w-4 h-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Danger Zone */}
      <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl">
        <h3 className="font-semibold text-lg text-red-900 mb-4">Danger Zone</h3>
        <p className="text-sm text-red-800 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button variant="destructive">Delete Account</Button>
      </div>
    </div>
  )
}
