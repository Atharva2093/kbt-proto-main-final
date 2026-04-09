import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/contexts/auth-context'
import { CartProvider } from '@/contexts/cart-context'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'ThermoSmart - Smart Optimization for Energy Efficient Wall Design',
  description: 'ThermoSmart analyzes heat transfer in composite walls, recommends optimal materials, and generates procurement-ready material lists.',
  applicationName: 'ThermoSmart',
  keywords: ['thermal analysis', 'wall optimization', 'energy efficiency', 'building materials', 'procurement'],
  openGraph: {
    title: 'ThermoSmart',
    description: 'AI-powered thermal optimization for composite wall design.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ThermoSmart',
    description: 'AI-powered thermal optimization for composite wall design.',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-sm"
        >
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider>
            <CartProvider>
              <div id="main-content">{children}</div>
              <Analytics />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
