'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Spinner } from '@/components/ui/spinner'

const MAX_WAIT_TIME = 5000 // 5 seconds max wait

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  const [startTime] = useState(Date.now())

  useEffect(() => {
    const elapsedTime = Date.now() - startTime
    console.log(`ProtectedRoute - Auth state [${elapsedTime}ms]:`, { isAuthenticated, isLoading, user: user?.email })
    
    if (!isLoading) {
      setIsChecking(false)
      if (!isAuthenticated) {
        console.log('ProtectedRoute - Not authenticated, redirecting to login')
        router.push('/login')
      } else {
        console.log('ProtectedRoute - Authenticated, showing content')
      }
    } else if (elapsedTime > MAX_WAIT_TIME) {
      // Safety valve: if taking too long, consider it loaded anyway
      console.warn('ProtectedRoute - Timeout waiting for auth, proceeding anyway')
      setIsChecking(false)
    }
  }, [isAuthenticated, isLoading, router, user?.email, startTime])

  if (isChecking && isLoading) {
    console.log('ProtectedRoute - Still loading, showing spinner')
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Spinner />
      </div>
    )
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute - Not authenticated, showing nothing and redirecting')
    return null
  }

  console.log('ProtectedRoute - Rendering children')
  return <>{children}</>
}
