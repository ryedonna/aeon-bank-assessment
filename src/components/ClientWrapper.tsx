'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Navbar from './Navbar'

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [showNavbar, setShowNavbar] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user has completed login successfully
    const loginSuccess = sessionStorage.getItem('loginSuccess') === 'true'
    setIsLoggedIn(loginSuccess)
    
    // Hide navbar after successful login
    if (loginSuccess) {
      setShowNavbar(false)
    } else {
      setShowNavbar(true)
    }
  }, [pathname])

  // Listen for login success events
  useEffect(() => {
    const handleLoginSuccess = () => {
      setIsLoggedIn(true)
      setShowNavbar(false)
      sessionStorage.setItem('loginSuccess', 'true')
    }

    // Custom event listener for login success
    window.addEventListener('loginSuccess', handleLoginSuccess)
    
    return () => {
      window.removeEventListener('loginSuccess', handleLoginSuccess)
    }
  }, [])

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  )
}