import Link from "next/link"
import { BrandLogo } from "@/components/brand-logo"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-12 text-foreground">
      <div className="mx-auto max-w-3xl space-y-8">
        <BrandLogo href="/" />
        <header>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: April 9, 2026</p>
        </header>

        <section className="space-y-4 text-sm leading-7 text-muted-foreground">
          <p>
            ThermoSmart stores account profile and project configuration data required to provide thermal analysis,
            optimization, and procurement features.
          </p>
          <p>
            We do not sell personal data. Access to project data is limited to authorized systems and users.
          </p>
          <p>
            You may request account deletion and data export through support channels.
          </p>
        </section>

        <Link href="/signup" className="text-sm font-medium text-primary hover:underline">
          Back to Sign Up
        </Link>
      </div>
    </div>
  )
}
