import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './hero/Nav'
import Footer from './footer/Footer'

export default function Layout() {
  const location = useLocation()
  const hideChrome = location.pathname === '/experience'

  return (
    <div className="flex flex-col min-h-screen">
      {!hideChrome && <Nav />}
      <div className={`flex-1${hideChrome ? '' : ' pt-16'}`}>
        <Outlet />
      </div>
      {!hideChrome && <Footer />}
    </div>
  )
}
