"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building2, CreditCard, Mail, Shield, Save } from "lucide-react"
import AdminSidebar from "@/components/admin-sidebar"

type TabType = "general" | "payment" | "email" | "security"

export default function SettingsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>("general")

  // General Settings State
  const [companyName, setCompanyName] = useState("TravelTours Philippines")
  const [companyEmail, setCompanyEmail] = useState("info@traveltours.ph")
  const [companyPhone, setCompanyPhone] = useState("+63 2 1234 5678")
  const [companyAddress, setCompanyAddress] = useState("123 Travel Street, Makati City, Philippines")
  const [website, setWebsite] = useState("https://traveltours.ph")
  const [timezone, setTimezone] = useState("Asia/Manila")
  const [currency, setCurrency] = useState("PHP")

  // Payment Settings State
  const [paypalEnabled, setPaypalEnabled] = useState(true)
  const [paypalClientId, setPaypalClientId] = useState("AZTxxxxxxxxxxxxxxxxxxxxxxxYZ")
  const [stripeEnabled, setStripeEnabled] = useState(true)
  const [stripePublishableKey, setStripePublishableKey] = useState("pk_live_xxxxxxxxxxxxxxxxxx")
  const [gcashEnabled, setGcashEnabled] = useState(true)
  const [mayaEnabled, setMayaEnabled] = useState(true)

  // Email Settings State
  const [smtpHost, setSmtpHost] = useState("smtp.gmail.com")
  const [smtpPort, setSmtpPort] = useState("587")
  const [smtpUsername, setSmtpUsername] = useState("noreply@traveltours.ph")
  const [smtpPassword, setSmtpPassword] = useState("••••••••••••")
  const [smtpEncryption, setSmtpEncryption] = useState("TLS")
  const [fromEmail, setFromEmail] = useState("noreply@traveltours.ph")
  const [fromName, setFromName] = useState("TravelTours Philippines")

  // Security Settings State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState("30")
  const [passwordMinLength, setPasswordMinLength] = useState("8")
  const [requireSpecialChar, setRequireSpecialChar] = useState(true)
  const [requireNumber, setRequireNumber] = useState(true)
  const [requireUppercase, setRequireUppercase] = useState(true)

  const handleSaveSettings = () => {
    alert(`Saving ${activeTab} settings...`)
  }

  const tabs = [
    { id: "general" as TabType, label: "General", icon: <Building2 className="w-4 h-4" /> },
    { id: "payment" as TabType, label: "Payment", icon: <CreditCard className="w-4 h-4" /> },
    { id: "email" as TabType, label: "Email", icon: <Mail className="w-4 h-4" /> },
    { id: "security" as TabType, label: "Security", icon: <Shield className="w-4 h-4" /> }
  ]

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <AdminSidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">System Settings</h1>
              <p className="text-sm text-neutral-600">Configure your system preferences and settings</p>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 overflow-auto">
          {/* Tabs Navigation */}
          <div className="flex gap-2 mb-6 border-b border-neutral-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* General Settings */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>Update your company details and business information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700">Company Name</label>
                      <Input
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Company Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700">Company Email</label>
                      <Input
                        type="email"
                        value={companyEmail}
                        onChange={(e) => setCompanyEmail(e.target.value)}
                        placeholder="email@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700">Phone Number</label>
                      <Input
                        value={companyPhone}
                        onChange={(e) => setCompanyPhone(e.target.value)}
                        placeholder="+63 2 1234 5678"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700">Website</label>
                      <Input
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Company Address</label>
                    <Input
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      placeholder="Full company address"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700">Timezone</label>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Asia/Manila">Asia/Manila (GMT+8)</option>
                        <option value="UTC">UTC (GMT+0)</option>
                        <option value="America/New_York">America/New York (GMT-5)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700">Currency</label>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="PHP">PHP - Philippine Peso</option>
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={handleSaveSettings} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save General Settings
                </Button>
              </div>
            </div>
          )}

          {/* Payment Settings */}
          {activeTab === "payment" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Gateway Configuration</CardTitle>
                  <CardDescription>Configure your payment methods and gateway credentials</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* PayPal */}
                  <div className="border-b pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-neutral-900">PayPal</h3>
                        <p className="text-sm text-neutral-600">Accept payments via PayPal</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={paypalEnabled}
                          onChange={(e) => setPaypalEnabled(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    {paypalEnabled && (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-neutral-700">Client ID</label>
                          <Input
                            value={paypalClientId}
                            onChange={(e) => setPaypalClientId(e.target.value)}
                            placeholder="PayPal Client ID"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-neutral-700">Secret Key</label>
                          <Input
                            type="password"
                            value="••••••••••••••••"
                            placeholder="PayPal Secret Key"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Stripe */}
                  <div className="border-b pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-neutral-900">Stripe</h3>
                        <p className="text-sm text-neutral-600">Accept credit/debit card payments</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={stripeEnabled}
                          onChange={(e) => setStripeEnabled(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    {stripeEnabled && (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-neutral-700">Publishable Key</label>
                          <Input
                            value={stripePublishableKey}
                            onChange={(e) => setStripePublishableKey(e.target.value)}
                            placeholder="Stripe Publishable Key"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-neutral-700">Secret Key</label>
                          <Input
                            type="password"
                            value="••••••••••••••••"
                            placeholder="Stripe Secret Key"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Local Payment Methods */}
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-3">Local Payment Methods</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <p className="font-medium text-neutral-900">GCash</p>
                          <p className="text-sm text-neutral-600">Philippine mobile wallet</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={gcashEnabled}
                            onChange={(e) => setGcashEnabled(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <p className="font-medium text-neutral-900">Maya (PayMaya)</p>
                          <p className="text-sm text-neutral-600">Philippine digital wallet</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={mayaEnabled}
                            onChange={(e) => setMayaEnabled(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={handleSaveSettings} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save Payment Settings
                </Button>
              </div>
            </div>
          )}

          {/* Email Settings */}
          {activeTab === "email" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>SMTP Configuration</CardTitle>
                  <CardDescription>Configure your email server settings for sending notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700">SMTP Host</label>
                      <Input
                        value={smtpHost}
                        onChange={(e) => setSmtpHost(e.target.value)}
                        placeholder="smtp.gmail.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700">SMTP Port</label>
                      <Input
                        value={smtpPort}
                        onChange={(e) => setSmtpPort(e.target.value)}
                        placeholder="587"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700">SMTP Username</label>
                      <Input
                        value={smtpUsername}
                        onChange={(e) => setSmtpUsername(e.target.value)}
                        placeholder="username@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700">SMTP Password</label>
                      <Input
                        type="password"
                        value={smtpPassword}
                        onChange={(e) => setSmtpPassword(e.target.value)}
                        placeholder="••••••••••••"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700">Encryption</label>
                      <select
                        value={smtpEncryption}
                        onChange={(e) => setSmtpEncryption(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="TLS">TLS</option>
                        <option value="SSL">SSL</option>
                        <option value="None">None</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Sender Settings</CardTitle>
                  <CardDescription>Configure the default sender information for emails</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700">From Email</label>
                      <Input
                        type="email"
                        value={fromEmail}
                        onChange={(e) => setFromEmail(e.target.value)}
                        placeholder="noreply@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700">From Name</label>
                      <Input
                        value={fromName}
                        onChange={(e) => setFromName(e.target.value)}
                        placeholder="Company Name"
                      />
                    </div>
                  </div>
                  <Button variant="outline">
                    Send Test Email
                  </Button>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={handleSaveSettings} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save Email Settings
                </Button>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Authentication & Security</CardTitle>
                  <CardDescription>Configure security settings and authentication policies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h3 className="font-semibold text-neutral-900">Two-Factor Authentication (2FA)</h3>
                      <p className="text-sm text-neutral-600">Require 2FA for admin accounts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={twoFactorEnabled}
                        onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Session Timeout (minutes)</label>
                    <Input
                      type="number"
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(e.target.value)}
                      placeholder="30"
                    />
                    <p className="text-xs text-neutral-600">Users will be logged out after this period of inactivity</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Password Policy</CardTitle>
                  <CardDescription>Set password requirements for user accounts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Minimum Password Length</label>
                    <Input
                      type="number"
                      value={passwordMinLength}
                      onChange={(e) => setPasswordMinLength(e.target.value)}
                      placeholder="8"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <span className="text-sm text-neutral-700">Require at least one special character</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={requireSpecialChar}
                          onChange={(e) => setRequireSpecialChar(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <span className="text-sm text-neutral-700">Require at least one number</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={requireNumber}
                          onChange={(e) => setRequireNumber(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <span className="text-sm text-neutral-700">Require at least one uppercase letter</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={requireUppercase}
                          onChange={(e) => setRequireUppercase(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={handleSaveSettings} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save Security Settings
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
