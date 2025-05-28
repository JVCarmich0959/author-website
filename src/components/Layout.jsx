import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './hero/Nav'
import Footer from './footer/Footer'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="flex-1 pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
