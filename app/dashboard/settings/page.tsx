"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Globe, Shield, LogOut, Save } from "lucide-react"

export default function SettingsPage() {
  const { user, updateProfile, logout } = useAuth()
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    company: user?.company || "",
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      await updateProfile({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        company: profileData.company,
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and application preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Profile Settings</CardTitle>
              </div>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input 
                    id="first-name" 
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input 
                    id="last-name" 
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={profileData.email}
                  disabled
                  className="bg-muted/50"
                />
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input 
                  id="company" 
                  name="company"
                  value={profileData.company}
                  onChange={handleProfileChange}
                />
              </div>
              <Button onClick={handleSaveProfile} disabled={isSaving} className="gap-2">
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Notifications</CardTitle>
              </div>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive project updates via email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Analysis Complete</p>
                  <p className="text-sm text-muted-foreground">
                    Notify when thermal analysis finishes
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Procurement Updates</p>
                  <p className="text-sm text-muted-foreground">
                    Order status and shipping notifications
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Weekly Reports</p>
                  <p className="text-sm text-muted-foreground">
                    Receive weekly project summary
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Regional Settings */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Regional Settings</CardTitle>
              </div>
              <CardDescription>
                Configure units and regional preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Temperature Unit</Label>
                  <Select defaultValue="celsius">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="celsius">Celsius (°C)</SelectItem>
                      <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Measurement System</Label>
                  <Select defaultValue="metric">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (m, kg, W/mK)</SelectItem>
                      <SelectItem value="imperial">Imperial (ft, lbs, BTU)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Security</CardTitle>
              </div>
              <CardDescription>
                Manage your account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
              <Button variant="outline" className="w-full">
                Enable Two-Factor Authentication
              </Button>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="border-destructive/30 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-lg text-destructive">Account Actions</CardTitle>
              <CardDescription>
                Manage or delete your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="destructive" 
                className="w-full gap-2"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
              <Button variant="outline" className="w-full text-destructive border-destructive hover:bg-destructive/10">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
