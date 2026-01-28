'use client'

import { DashboardNavbar } from '@/components/custom/dashboard-navbar'
import { Sidebar } from '@/components/custom/sidebar'
import { useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} userRole="admin" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <DashboardNavbar
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
