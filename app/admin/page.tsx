'use client'

import { useAuth } from '@/hooks/useAuth'
import { adminPaths } from '@/lib/paths'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'admin')) {
      router.push('/login')
    }
  }, [isAuthenticated, user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">
          Access denied. Admin privileges required.
        </div>
      </div>
    )
  }

  router.push(adminPaths.dashboard)
}
