"use client"

import { useState } from "react"
import Link from "next/link"
import { BrandLogo } from "@/components/brand-logo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      return
    }
    setSubmitted(true)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <BrandLogo href="/" textClassName="text-2xl" />
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              Enter your account email and we will send a reset link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm text-foreground">
                <div className="mb-2 flex items-center gap-2 font-medium text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                  Reset link sent
                </div>
                If an account exists for {email}, you will receive an email with reset instructions.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="reset-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Send Reset Link
                </Button>
              </form>
            )}

            <Link href="/login" className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:underline">
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
