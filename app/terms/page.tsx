import Link from "next/link"
import { BrandLogo } from "@/components/brand-logo"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-12 text-foreground">
      <div className="mx-auto max-w-3xl space-y-8">
        <BrandLogo href="/" />
        <header>
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: April 9, 2026</p>
        </header>

        <section className="space-y-4 text-sm leading-7 text-muted-foreground">
          <p>
            These terms govern your use of ThermoSmart. By using this app, you agree to use it responsibly
            and provide accurate project data for analysis and procurement estimates.
          </p>
          <p>
            Forecasts and optimization outputs are advisory and should be validated by qualified professionals
            before procurement and construction decisions.
          </p>
          <p>
            We may update these terms over time. Continued use of the app after updates constitutes acceptance.
          </p>
        </section>

        <Link href="/signup" className="text-sm font-medium text-primary hover:underline">
          Back to Sign Up
        </Link>
      </div>
    </div>
  )
}
